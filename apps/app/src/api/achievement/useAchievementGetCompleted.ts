import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const achievementGetCompleted = () => {
  return axios.get<never, AchievementDto[]>('/achievement/completed');
};

export const useAchievementGetCompleted = (
  options?: QueryOptions<AchievementDto[]>,
) => {
  return useQuery(
    [QUERY_KEYS.achievementCompleted],
    achievementGetCompleted,
    options,
  );
};
