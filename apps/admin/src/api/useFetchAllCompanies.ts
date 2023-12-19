import { Company } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllCompanies = async () =>
  await api.get<never, Company[]>('/companies');

export const useFetchAllCompanies = () => {
  return useQuery(['companies'], fetchAllCompanies);
};
