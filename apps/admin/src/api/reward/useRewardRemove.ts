import { RewardDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const rewardRemove = async (id: number) => {
  return await api.delete<never, RewardDto>(`/reward/${id}`);
};

export const useRewardRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(rewardRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reward']);
      toast.success('Nagrada uspiješno uklonjena!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
