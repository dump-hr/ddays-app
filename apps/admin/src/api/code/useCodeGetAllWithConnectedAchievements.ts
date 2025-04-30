import { CodeWithConnectedAchievementsDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const codeGetAllWithConnectedAchievements = () => {
  return api.get<never, CodeWithConnectedAchievementsDto[]>(
    `/code/with-connected-achievements`,
  );
};

export const useCodeGetAllWithConnectedAchievements = (
  options?: QueryOptions<CodeWithConnectedAchievementsDto[]>,
) => {
  return useQuery(['code1'], codeGetAllWithConnectedAchievements, options);
};
