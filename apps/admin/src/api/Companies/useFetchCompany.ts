import { QueryOptions, useQuery } from 'react-query';

import { CompanyDetailsDto } from '../../types/company';
import { api } from '..';

const fetchCompany = async (id: number) =>
  await api.get<never, CompanyDetailsDto>(`/companies/${id}`);

export const useFetchCompany = (
  id: number,
  options?: QueryOptions<CompanyDetailsDto>,
) => {
  return useQuery(['company', id], () => fetchCompany(id), options);
};
