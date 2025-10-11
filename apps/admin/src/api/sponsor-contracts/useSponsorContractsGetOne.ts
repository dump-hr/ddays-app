import { SponsorContractDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const getSponsorContract = (id: number) => {
  return api.get<never, Partial<SponsorContractDto>>(
    `/sponsor-contracts/${id}`,
  );
};

export const useSponsorContractsGetOne = (id?: number) => {
  return useQuery(['sponsor-contracts', id], () => getSponsorContract(id!), {
    enabled: !!id,
  });
};
