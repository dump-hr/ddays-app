import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const achievementGetCompleted = () => {
  return axios.get<never, AchievementDto[]>('/achievement/completed');
};

export const useAchievementGetCompleted = (
  options?: QueryOptions<AchievementDto[]>,
) => {
  return useQuery(['achievement-completed'], achievementGetCompleted, options);
};
