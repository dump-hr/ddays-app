import { CompanyDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const companyGetOne = async (id: number) => {
  return await api.get<never, CompanyDto>(
    `/company/include-sensitive-info/${id}`,
  );
};

export const useCompanyGetOne = (
  id?: number,
  options?: QueryOptions<CompanyDto>,
) => {
  return useQuery(
    ['company', 'include-sensitive-info', id],
    () => companyGetOne(id!),
    {
      enabled: !!id,
      ...options,
    },
  );
};
