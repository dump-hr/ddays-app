import axios from '../base';
import { useQuery } from 'react-query';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getAllShopItems = async (): Promise<ShopItemDto[]> => {
  return axios.get('/shop/items');
};

export const useGetAllShopItems = () => {
  return useQuery<ShopItemDto[]>([QUERY_KEYS.shopItems], getAllShopItems);
};
