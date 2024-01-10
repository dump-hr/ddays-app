import { Interest } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const fetchInterest = async (id: number) =>
  await api.get<never, Interest>(`/interests/${id}`);

export const useFetchInterest = (
  id: number,
  options?: QueryOptions<Interest>,
) => {
  return useQuery(['interest', id], () => fetchInterest(id), options);
};
