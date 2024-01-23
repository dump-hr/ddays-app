import { InterestDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const achievementGetAll = () => {
  return api.get<never, InterestDto[]>('/achievement');
};

export const useAchievementGetAll = (options?: QueryOptions<InterestDto[]>) => {
  return useQuery(['achievement'], achievementGetAll, options);
};
