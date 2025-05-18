import { useQuery } from 'react-query';
import { api } from '../index';
import { ShopItemDto } from '@ddays-app/types/src/dto/shop';

const getSingleShopItem = async (
  id: number | undefined,
): Promise<ShopItemDto> => {
  return api.get(`/shop/items/${id}`);
};

export const useGetSingleShopItem = (id: number | undefined) => {
  return useQuery<ShopItemDto>(['shopItem', id], () => getSingleShopItem(id), {
    enabled: !!id,
  });
};
