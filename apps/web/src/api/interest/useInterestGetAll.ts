import { Interest } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const interestGetAll = () => {
  return api.get<never, Interest[]>('/interest');
};

export const useInterestGetAll = (options?: QueryOptions<Interest[]>) => {
  return useQuery(['interest'], interestGetAll, options);
};
