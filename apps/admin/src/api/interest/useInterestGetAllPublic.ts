import { InterestDto as InterestPublicDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const interestGetAllPublic = async () => {
  return await api.get<never, InterestPublicDto[]>('/interest');
};

export const useInterestGetAllPublic = (
  options?: QueryOptions<InterestPublicDto[]>,
) => {
  return useQuery(['interest'], interestGetAllPublic, options);
};
