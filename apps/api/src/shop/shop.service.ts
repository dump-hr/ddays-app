import {
  ShopItemDto,
  TransactionCreateDto,
} from '@ddays-app/types/src/dto/shop';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async createShopItem(createShopItemDto: ShopItemDto) {
    await this.prisma.shopItem.create({
      data: createShopItemDto,
    });
  }

  async buyItem(transactionCreateDto: TransactionCreateDto) {
    // create transaction item ShopCart model
    const { userId, quantity, shopItemId } = transactionCreateDto;
    const newTransactionItem =
      await this.createTransactionItem(transactionCreateDto);

    // update the user points
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      throw new BadRequestException('User not found');
    }

    const updatedPoints =
      currentUser.points - newTransactionItem.shopItem.price * quantity;

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        points: updatedPoints,
      },
    });

    // update the quantity of ShopItem
    await this.prisma.shopItem.update({
      where: {
        id: shopItemId,
      },
      data: {
        quantity: newTransactionItem.shopItem.quantity - quantity,
      },
    });
  }

  async createTransactionItem(transactionCreateDto: TransactionCreateDto) {
    return await this.prisma.shoppingCart.create({
      data: {
        ...transactionCreateDto,
      },
      include: {
        shopItem: true,
      },
    });
  }

  async getAllShopItems() {
    return await this.prisma.shopItem.findMany({});
  }

  async getAllUserTransactions(userId: number) {
    return await this.prisma.shoppingCart.findMany({
      where: {
        userId,
      },
    });
  }

  async updateShopItem(id: number, updateShopDto: ShopItemDto) {
    return await this.prisma.shopItem.update({
      where: {
        id,
      },
      data: updateShopDto,
    });
  }

  async removeShopItem(id: number) {
    return await this.prisma.shopItem.delete({
      where: {
        id,
      },
    });
  }
}
