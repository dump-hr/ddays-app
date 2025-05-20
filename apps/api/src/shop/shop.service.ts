import {
  ShopItemCreateDto,
  ShopItemDto,
  ShopItemModifyDto,
  ShoppingCartItemStage,
  TransactionCreateDto,
  TransactionItemDto,
} from '@ddays-app/types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BlobService } from 'src/blob/blob.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly blobService: BlobService,
  ) {}

  async createShopItem(createShopItemDto: ShopItemCreateDto) {
    await this.prisma.shopItem.create({
      data: createShopItemDto,
    });
  }

  async buyItems(transactionCreateDtos: TransactionCreateDto[]) {
    const { userId, purchaseItems, totalPrice } =
      await this.validatePurchaseItems(transactionCreateDtos);

    await this.prisma.$transaction(async (prisma) => {
      const now = new Date();
      const takeByTime = new Date(now.getTime() + 30 * 60 * 1000);

      await prisma.transactionItem.createMany({
        data: transactionCreateDtos.map((item) => {
          return {
            ...item,
            takeByTime: takeByTime,
            orderedAt: now,
          };
        }),
      });

      // Update user points
      await prisma.user.update({
        where: { id: userId },
        data: {
          points: { decrement: totalPrice },
        },
      });

      // Update shop item quantities in bulk
      await Promise.all(
        purchaseItems.map(({ quantity, shopItemId }) =>
          prisma.shopItem.update({
            where: { id: shopItemId },
            data: {
              quantity: { decrement: quantity },
            },
          }),
        ),
      );
    });
    return purchaseItems;
  }

  async validatePurchaseItems(transactionCreateDtos: TransactionCreateDto[]) {
    if (!transactionCreateDtos.length) {
      throw new BadRequestException('Nema proizvoda za kupnju');
    }

    // Validate that all items are for same user
    const userId = transactionCreateDtos[0].userId;
    if (!transactionCreateDtos.every((item) => item.userId === userId)) {
      throw new BadRequestException(
        'Svi proizvodi moraju biti za istog korisnika',
      );
    }

    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      throw new BadRequestException('Korisnik nije pronađen');
    }

    const { purchaseItems, totalPrice } =
      await this.calculateTotalPriceAndValidateShopItems(transactionCreateDtos);
    if (currentUser.points < totalPrice) {
      throw new BadRequestException('Nemate dovoljno bodova');
    }

    return { userId, purchaseItems, totalPrice };
  }

  async getAllShopItems() {
    return await this.prisma.shopItem.findMany({});
  }

  async getUserPoints(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        points: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Korisnik nije pronađen');
    }
    return { points: user.points };
  }

  async getAllUserTransactions(userId: number) {
    return await this.prisma.transactionItem.findMany({
      where: {
        userId,
      },
      include: {
        shopItem: true,
      },
      orderBy: {
        orderedAt: 'desc',
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

  async getShopItemById(id: number) {
    const shopItem = await this.prisma.shopItem.findUnique({
      where: {
        id,
      },
    });

    if (!shopItem) {
      throw new BadRequestException('Artikl nije pronađen');
    }

    return shopItem;
  }

  async updateShopItem(id: number, updateShopDto: ShopItemModifyDto) {
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

  async calculateTotalPriceAndValidateShopItems(
    transactionCreateDtos: TransactionCreateDto[],
  ) {
    const shopItemIds = transactionCreateDtos.map((item) => item.shopItemId);
    const shopItems = await this.prisma.shopItem.findMany({
      where: {
        id: { in: shopItemIds },
      },
    });

    const shopItemMap = new Map(
      (shopItems as ShopItemDto[]).map((item) => [item.id, item]),
    );
    let totalPrice = 0;

    const purchaseItems = transactionCreateDtos.map((item) => {
      const shopItem = shopItemMap.get(item.shopItemId);

      if (!shopItem) {
        throw new BadRequestException(
          `Artikl ${item.shopItemId} nije pronađen`,
        );
      }

      if (shopItem.quantity < item.quantity) {
        throw new BadRequestException(
          `Nema dovoljno ${shopItem.itemName} na zalihama`,
        );
      }

      totalPrice += shopItem.price * item.quantity;
      const purchaseItem: TransactionItemDto = {
        ...item,
        shopItem,
      };
      return purchaseItem;
    });

    return { purchaseItems, totalPrice };
  }

  async updateShopItemPhoto(id: number, file: Express.Multer.File) {
    const uploadedImage = await this.blobService.upload(
      'shop-item-image',
      file.buffer,
      file.mimetype,
    );

    const updatedShopItem = (await this.prisma.shopItem.update({
      where: { id },
      data: { imageUrl: uploadedImage },
    })) as ShopItemDto;

    return updatedShopItem;
  }

  async deleteShopItemPhoto(id: number): Promise<void> {
    await this.prisma.shopItem.update({
      where: { id },
      data: { imageUrl: null },
    });
  }
}
