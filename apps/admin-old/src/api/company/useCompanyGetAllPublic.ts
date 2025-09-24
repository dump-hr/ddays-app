import { CompanyDto as CompanyPublicDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const companyGetAllPublic = async () => {
  return await api.get<never, CompanyPublicDto[]>('/company');
};

export const useCompanyGetAllPublic = (
  options?: QueryOptions<CompanyPublicDto[]>,
) => {
  return useQuery(['company'], companyGetAllPublic, options);
};
