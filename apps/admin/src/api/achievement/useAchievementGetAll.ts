import { AchievementGetAllResDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const achievementGetAll = () => {
  return api.get<never, AchievementGetAllResDto>('/achievement');
};

export const useAchievementGetAll = (
  options?: QueryOptions<AchievementGetAllResDto>,
) => {
  return useQuery(['achievement'], achievementGetAll, options);
};
