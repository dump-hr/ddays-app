import { QueryOptions, useQuery } from 'react-query';

import { CompanyDto } from '../../types/company';
import { api } from '..';

const fetchCompany = async (id: number | undefined) => {
  if (!id) return undefined;
  return await api.get<never, CompanyDto>(`/companies/${id}`);
};
export const useFetchCompany = (
  id: number | undefined,
  options?: QueryOptions<CompanyDto | undefined>,
) => {
  return useQuery(['company', id], () => fetchCompany(id), options);
};
