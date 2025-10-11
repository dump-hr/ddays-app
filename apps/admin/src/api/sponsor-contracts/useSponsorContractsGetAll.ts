import { SponsorContractDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const sponsorContractsGetAll = async () => {
  return await api.get<never, SponsorContractDto[]>('/sponsor-contracts');
};

export const useSponsorContractsGetAll = (
  options?: QueryOptions<SponsorContractDto[]>,
) => {
  return useQuery(['sponsor-contracts'], sponsorContractsGetAll, options);
};
