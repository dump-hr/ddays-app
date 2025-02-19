import { ShopItemType } from '@prisma/client';

export type ShopItemDto = {
  id: number;
  type: ShopItemType | null;
  itemName: string | null;
  quantity: number | null;
  price: number;
};
