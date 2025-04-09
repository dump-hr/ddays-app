import { ShopItemType } from '@prisma/client';
import { ShoppingCartItemStage } from '../enum';

export type ShopItemDto = {
  id: number;
  type: ShopItemType | null;
  itemName: string | null;
  quantity: number | null;
  price: number;
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
  quantity: number;
  stage: ShoppingCartItemStage;
}
