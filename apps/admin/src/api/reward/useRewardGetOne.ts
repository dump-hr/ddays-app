import { RewardDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const rewardGetOne = async (id: number) => {
  return await api.get<never, RewardDto>(`/reward/${id}`);
};

export const useRewardGetOne = (
  id?: number,
  options?: QueryOptions<RewardDto>,
) => {
  return useQuery(['reward', id], () => rewardGetOne(id!), {
    enabled: !!id,
    ...options,
  });
};
