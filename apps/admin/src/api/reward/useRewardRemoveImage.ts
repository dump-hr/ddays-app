import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const rewardRemoveImage = async (id: number | undefined) => {
  return await api.delete(`/reward/photo/${id}`);
};

export const useRewardRemoveImage = () => {
  const queryClient = useQueryClient();

  return useMutation(rewardRemoveImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reward']);
      toast.success('Slika uspiješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
