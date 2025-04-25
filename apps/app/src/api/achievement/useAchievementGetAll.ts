import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const achievementGetAll = () => {
  return axios.get<never, AchievementDto[]>('/achievement');
};

export const useAchievementGetAll = (
  options?: QueryOptions<AchievementDto[]>,
) => {
  return useQuery(['achievement'], achievementGetAll, options);
};
