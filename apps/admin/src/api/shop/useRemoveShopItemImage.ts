import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const shopItemRemoveImage = async (rewardFile: { id: number | undefined }) => {
  return await api.delete(`/shop/photo/${rewardFile.id}`);
};

export const useRemoveShopItemImage = () => {
  const queryClient = useQueryClient();

  return useMutation(shopItemRemoveImage, {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['shopItem', id]);
      queryClient.invalidateQueries(['shopItems']);
      toast.success('Slika uspiješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
