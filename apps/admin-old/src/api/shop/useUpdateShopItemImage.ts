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
    onMutate: () => {
      return toast.loading('Uploadanje slike...');
    },
    onSuccess: (_, { id }, toastId) => {
      queryClient.invalidateQueries(['shopItem', id]);
      queryClient.invalidateQueries(['shopItems']);
      toast.dismiss(toastId);
      toast.success('Slika uspiješno uploadana');
    },
    onError: (error: string, _, toastId) => {
      toast.dismiss(toastId);
      toast.error(error);
    },
  });
};
