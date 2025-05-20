import { ShopItemDto } from '@ddays-app/types/src/dto/shop';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const deleteShopItem = ({ id }: { id: number }) => {
  return api.delete<never, ShopItemDto>(`/shop/shopItem/${id}`);
};

export const useDeleteShopItem = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteShopItem, {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['shopItems']);
      queryClient.invalidateQueries(['shopItem', id]);
      toast.success('Artikal uspješno obrisan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
