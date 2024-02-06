import { InterestDto as InterestPublicDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const interestGetAll = async () => {
  return await api.get<never, InterestPublicDto[]>('/interest');
};

export const useInterestGetAll = (
  options?: QueryOptions<InterestPublicDto[]>,
) => {
  return useQuery(['interest'], interestGetAll, options);
};
