import { api } from '../index';
import { useMutation, useQueryClient } from 'react-query';
import { ShopItemDto, ShopItemModifyDto } from '@ddays-app/types/src/dto/shop';
import toast from 'react-hot-toast';

export const updateShopItem = (id: number, dto: ShopItemModifyDto) => {
  return api.patch<ShopItemModifyDto, ShopItemDto>(`/shop/shopItem/${id}`, dto);
};

export const useUpdateShopItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { id: number; dto: ShopItemModifyDto }) =>
      updateShopItem(data.id, data.dto),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(['shopItem', id]);
        queryClient.invalidateQueries(['shopItems']);
        toast.success('Artikal uspješno ažuriran!');
      },
      onError: (error: string) => {
        toast.error(error);
      },
    },
  );
};
