import { PotentialSponsorDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const potentialSponsorGetAll = async () => {
  return await api.get<never, PotentialSponsorDto[]>('/potential-sponsor');
};

export const usePotentialSponsorGetAll = (
  options?: QueryOptions<PotentialSponsorDto[]>,
) => {
  return useQuery(['potential-sponsor'], potentialSponsorGetAll, options);
};
