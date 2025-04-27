import { RewardDto, RewardModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const rewardCreate = async (dto: RewardModifyDto) => {
  return await api.post<RewardModifyDto, RewardDto>('/reward', dto);
};

export const useRewardCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(rewardCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reward']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
