import { RewardDto, RewardModifyDto } from '@ddays-app/types';
import { api } from '..';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

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
