import { JobDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const jobGetAll = () => {
  return api.get<never, JobDto[]>('/job');
};

export const useJobGetAll = () => {
  return useQuery('jobs', jobGetAll);
};
