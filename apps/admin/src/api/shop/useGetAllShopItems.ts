import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { useQuery } from 'react-query';

import { api } from '../index';

const getAllShopItems = async (): Promise<ShopItemDto[]> => {
  return api.get<never, ShopItemDto[]>('/shop/items');
};

export const useGetAllShopItems = () => {
  return useQuery<ShopItemDto[]>(['shopItems'], getAllShopItems);
};
