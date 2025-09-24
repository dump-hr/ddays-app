import { AchievementWithUuidDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const achievementGetAllWithUuid = () => {
  return api.get<never, AchievementWithUuidDto[]>('/achievement/with-uuid');
};

export const useAchievementGetAllWithUuid = (
  options?: QueryOptions<AchievementWithUuidDto[]>,
) => {
  return useQuery(['achievement'], achievementGetAllWithUuid, options);
};
