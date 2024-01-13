import { QueryOptions, useQuery } from 'react-query';

import { InterestDto } from '../../types/interest';
import { api } from '..';

const fetchAllInterests = async () =>
  await api.get<never, InterestDto[]>('/interests');

export const useFetchInterests = (options?: QueryOptions<InterestDto[]>) => {
  return useQuery(['interest'], fetchAllInterests, options);
};
