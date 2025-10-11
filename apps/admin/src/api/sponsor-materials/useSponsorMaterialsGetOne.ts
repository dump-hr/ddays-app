import { SponsorMaterialsDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const getSponsorMaterials = (id: number) => {
  return api.get<never, Partial<SponsorMaterialsDto>>(
    `/sponsor-materials/${id}`,
  );
};

export const useSponsorMaterialsGetOne = (id?: number) => {
  return useQuery(['sponsor-materials', id], () => getSponsorMaterials(id!), {
    enabled: !!id,
  });
};
