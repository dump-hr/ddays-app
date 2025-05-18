import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ShoppingCartItemStage, ShopItemType } from '../enum';

export type ShopItemDto = {
  id: number;
  type: ShopItemType | null;
  itemName: string | null;
  quantity: number | null;
  price: number | null;
};

export class ShopItemModifyDto {
  @IsEnum(ShopItemType)
  @IsOptional()
  type?: ShopItemType;

  @IsOptional()
  @IsString()
  itemName?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}

export class ShopItemCreateDto {
  @IsEnum(ShopItemType)
  type: ShopItemType;

  @IsString()
  itemName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class TransactionCreateDto {
  @IsNumber()
  shopItemId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  quantity: number;

  @IsEnum(ShoppingCartItemStage)
  stage: ShoppingCartItemStage;
}

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
