import { AchievementDto } from '@ddays-app/types';
import axios from 'axios';
import { QueryOptions, useQuery } from 'react-query';

const achievementGetOne = (id: number) => {
  return axios.get<never, AchievementDto>(`/achievement/${id}`);
};

export const useAchievementGetOne = (
  id?: number,
  options?: QueryOptions<AchievementDto>,
) => {
  return useQuery([], () => achievementGetOne(id!), {
    enabled: !!id,
    ...options,
  });
};
