import { InterestDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const interestGetOne = async (id: number) => {
  return await api.get<never, InterestDto>(`/interest/${id}`);
};

export const useInterestGetOne = (
  id?: number,
  options?: QueryOptions<InterestDto>,
) => {
  return useQuery(['interest', id], () => interestGetOne(id!), {
    enabled: !!id,
    ...options,
  });
};
