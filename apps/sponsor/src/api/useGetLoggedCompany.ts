import { useQuery } from 'react-query';

import { CompanyDto } from '../types/company';
import { api } from '.';

const getLoggedCompany = async () =>
  await api.get<never, CompanyDto>('/company/logged');

export const useGetLoggedCompany = () => {
  return useQuery(['loggedCompany'], getLoggedCompany);
};