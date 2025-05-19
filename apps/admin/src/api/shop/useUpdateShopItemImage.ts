import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const shopItemUpdateImage = async (rewardFile: {
  id: number | undefined;
  file: File;
}) => {
  const data = new FormData();
  data.append('file', rewardFile.file);

  return await api.patchForm(`/shop/photo/${rewardFile.id}`, data);
};

export const useUpdateShopItemImage = () => {
  const queryClient = useQueryClient();

  return useMutation(shopItemUpdateImage, {
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['shopItem', id]);
      queryClient.invalidateQueries(['shopItems']);
      toast.success('Slika uspiješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
