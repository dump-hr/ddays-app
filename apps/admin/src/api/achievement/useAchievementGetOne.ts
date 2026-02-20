import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const achievementGetOne = (id: number) => {
  return api.get<never, AchievementDto>(`/achievement/${id}`);
};

export const useAchievementGetOne = (
  id?: number,
  options?: QueryOptions<AchievementDto>,
) => {
  return useQuery(['achievement', id], () => achievementGetOne(id!), {
    enabled: !!id,
    ...options,
  });
};
