import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const achievementGetAll = () => {
  return api.get<never, AchievementDto[]>('/achievement');
};

export const useAchievementGetAll = (
  options?: QueryOptions<AchievementDto[]>,
) => {
  return useQuery(['achievement'], achievementGetAll, options);
};
