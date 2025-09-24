import { RewardDto, RewardModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const rewardUpdate = async (dto: RewardModifyDto & { id: number }) => {
  return await api.patch<RewardModifyDto, RewardDto>(`/reward/${dto.id}`, {
    ...dto,
    id: undefined,
  });
};

export const useRewardUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(rewardUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reward']);
      toast.success('Uređivanje nagrade uspiješno izvršeno');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
