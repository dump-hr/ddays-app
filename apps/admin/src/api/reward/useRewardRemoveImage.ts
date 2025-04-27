import { useMutation, useQueryClient } from 'react-query';
import { api } from '..';
import toast from 'react-hot-toast';

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
