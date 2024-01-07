import { QueryOptions, useQuery } from 'react-query';

import { CompanyDto } from '../../types/company';
import { api } from '..';

const fetchAllCompanies = async () =>
  await api.get<never, CompanyDto[]>('/companies');

export const useFetchCompanies = (options?: QueryOptions<CompanyDto[]>) => {
  return useQuery(['company'], fetchAllCompanies, options);
};
