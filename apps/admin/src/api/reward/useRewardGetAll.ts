import { QueryOptions, useQuery } from 'react-query';
import { api } from '..';
import { RewardDto } from '@ddays-app/types';

const rewardGetAll = () => {
  return api.get<never, RewardDto[]>('reward');
};

export const useRewardGetAll = (options?: QueryOptions<RewardDto[]>) => {
  return useQuery(['reward'], rewardGetAll, options);
};
