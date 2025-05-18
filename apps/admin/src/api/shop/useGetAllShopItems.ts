import { api } from '../index';
import { useQuery } from 'react-query';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';

const getAllShopItems = async (): Promise<ShopItemDto[]> => {
  return api.get<never, ShopItemDto[]>('/shop/items');
};

export const useGetAllShopItems = () => {
  return useQuery<ShopItemDto[]>(['shopItems'], getAllShopItems);
};
