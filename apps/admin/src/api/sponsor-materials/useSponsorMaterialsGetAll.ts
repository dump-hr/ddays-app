import { SponsorMaterialsDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const sponsorMaterialsGetAll = async () => {
  return await api.get<never, SponsorMaterialsDto[]>('/sponsor-materials');
};

export const useSponsorMaterialsGetAll = (
  options?: QueryOptions<SponsorMaterialsDto[]>,
) => {
  return useQuery(['sponsor-materials'], sponsorMaterialsGetAll, options);
};
