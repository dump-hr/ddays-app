import { ShopItemDto, ShopItemModifyDto } from '@ddays-app/types/src/dto/shop';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../index';

export const createShopItem = (dto: ShopItemModifyDto) => {
  return api.post<ShopItemModifyDto, ShopItemDto>('/shop/shopItem', dto);
};

export const useCreateShopItem = () => {
  const queryClient = useQueryClient();

  return useMutation(createShopItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['shopItems']);
      toast.success('Artikal uspješno kreiran!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
