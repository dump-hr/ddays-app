import { InterestDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const interestGetAll = async () => {
  return await api.get<never, InterestDto[]>('/interest');
};

export const useInterestGetAll = (options?: QueryOptions<InterestDto[]>) => {
  return useQuery(['interest'], interestGetAll, options);
};
