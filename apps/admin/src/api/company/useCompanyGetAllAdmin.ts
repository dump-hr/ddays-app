import { CompanyDto as CompanyAdminDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const companyGetAllAdmin = async () => {
  return await api.get<never, CompanyAdminDto[]>('/company/all-for-admin');
};

export const useCompanyGetAllAdmin = (
  options?: QueryOptions<CompanyAdminDto[]>,
) => {
  return useQuery(['company', 'admin'], companyGetAllAdmin, options);
};
