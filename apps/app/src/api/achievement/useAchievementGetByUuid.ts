import { AchievementDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const achievementGetByUuid = (uuid: string) => {
  return axios.get<never, AchievementDto>(`/achievement/${uuid}`);
};

export const useAchievementGetByUuid = (
  uuid: string,
  options?: QueryOptions<AchievementDto>,
) => {
  return useQuery(['achievement'], () => achievementGetByUuid(uuid), {
    enabled: !!uuid,
    ...options,
  });
};
