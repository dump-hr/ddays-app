import { Interest } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '.';

const fetchAllInterests = async () =>
  await api.get<never, Interest[]>('/interests');

export const useFetchInterests = (options?: QueryOptions<Interest[]>) => {
  return useQuery(['interests'], fetchAllInterests, options);
};
