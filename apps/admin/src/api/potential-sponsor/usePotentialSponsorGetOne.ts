import { PotentialSponsorDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const getPotentialSponsor = (id: number) => {
  return api.get<never, Partial<PotentialSponsorDto>>(
    `/potential-sponsor/${id}`,
  );
};

export const usePotentialSponsorGetOne = (id?: number) => {
  return useQuery(['potential-sponsor', id], () => getPotentialSponsor(id!), {
    enabled: !!id,
  });
};
