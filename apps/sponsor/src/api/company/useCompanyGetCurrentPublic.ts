import { CompanyPublicDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const companyGetCurrentPublic = () => {
  return api.get<never, CompanyPublicDto>('/company/current');
};

export const useCompanyGetCurrentPublic = (
  options?: QueryOptions<CompanyPublicDto>,
) => {
  return useQuery(['company', 'current'], companyGetCurrentPublic, options);
};
