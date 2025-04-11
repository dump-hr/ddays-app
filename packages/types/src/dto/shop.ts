import { ShoppingCartItemStage } from '../enum';
import { ShopItemType } from '@prisma/client';
export type ShopItemDto = {
  id: number;
  type: ShopItemType | null;
  itemName: string | null;
  quantity: number | null;
  price: number | null;
};

export type TransactionCreateDto = {
  shopItemId: number;
  userId: number;
  quantity: number;
  stage: ShoppingCartItemStage;
};

export type TransactionItemDto = {
  shopItemId: number;
  shopItem: ShopItemDto;
  userId: number;
  quantity: number | null;
  stage: ShoppingCartItemStage;
};

export type TransactionItemResponseDto = TransactionItemDto & {
  id: number;
  takeByTime: Date | null;
  orderedAt: Date | null;
};
