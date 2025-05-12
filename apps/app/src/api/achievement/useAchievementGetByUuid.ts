import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const achievementGetByUuid = (uuid: string) => {
  return axios.get<never, AchievementDto>(`/achievement/${uuid}`);
};

export const useAchievementGetByUuid = (
  uuid: string,
  options?: QueryOptions<AchievementDto>,
) => {
  return useQuery(
    [QUERY_KEYS.achievements, QUERY_KEYS.achievementCompleted],
    () => achievementGetByUuid(uuid),
    {
      enabled: !!uuid,
      ...options,
    },
  );
};
