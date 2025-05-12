import { RewardDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const rewardGetAll = () => {
  return api.get<never, RewardDto[]>('reward');
};

export const useRewardGetAll = (options?: QueryOptions<RewardDto[]>) => {
  return useQuery(['reward'], rewardGetAll, options);
};
