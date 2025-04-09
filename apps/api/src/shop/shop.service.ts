import { ShoppingCartItemStage } from '@ddays-app/types';
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
    const { userId, quantity, shopItemId } = transactionCreateDto;

    const { currentUser, totalPrice, shopItem } =
      await this.validateBuyItem(transactionCreateDto);

    return await this.prisma.$transaction(async (prisma) => {
      // Create transaction item
      const newTransactionItem = await prisma.transactionItem.create({
        data: transactionCreateDto,
        include: {
          shopItem: true,
        },
      });

      // Update user points
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: currentUser.points - totalPrice,
        },
      });

      // Update shop item quantity
      await prisma.shopItem.update({
        where: { id: shopItemId },
        data: {
          quantity: shopItem.quantity - quantity,
        },
      });

      return newTransactionItem;
    });
  }

  async validateBuyItem(transactionCreateDto: TransactionCreateDto) {
    const { userId, quantity, shopItemId } = transactionCreateDto;
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      throw new BadRequestException('Korisnik nije pronađen');
    }

    const shopItem = await this.prisma.shopItem.findUnique({
      where: { id: shopItemId },
    });

    if (!shopItem) {
      throw new BadRequestException('Artikl nije pronađen');
    }

    const totalPrice = quantity * shopItem.price;
    if (currentUser.points < totalPrice || currentUser.points < 0) {
      throw new BadRequestException('Nemate dovoljno bodova');
    }

    return { currentUser, totalPrice, shopItem };
  }

  async createTransactionItem(transactionCreateDto: TransactionCreateDto) {
    return await this.prisma.transactionItem.create({
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
    return await this.prisma.transactionItem.findMany({
      where: {
        userId,
      },
      include: {
        shopItem: true,
      },
    });
  }

  async verifyCollectedItem(id: number, userId: number) {
    const transactionItem = await this.prisma.transactionItem.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!transactionItem) {
      throw new BadRequestException('Transakcija nije pronađena');
    }

    if (transactionItem.stage === ShoppingCartItemStage.COLLECTED) {
      throw new BadRequestException('Vaš artikl je već preuzet');
    }

    await this.prisma.transactionItem.update({
      where: {
        id,
        userId,
      },
      data: {
        stage: ShoppingCartItemStage.COLLECTED,
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
