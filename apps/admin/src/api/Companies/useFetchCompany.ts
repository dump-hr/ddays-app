import { QueryOptions, useQuery } from 'react-query';

import { CompanyDetailsDto } from '../../types/company';
import { api } from '..';

const fetchCompany = async (id: number | undefined) => {
  if (!id) return undefined;
  await api.get<never, CompanyDetailsDto>(`/companies/${id}`);
};
export const useFetchCompany = (
  id: number | undefined,
  options?: QueryOptions<CompanyDetailsDto | undefined>,
) => {
  return useQuery(['company', id], () => fetchCompany(id), options);
};
