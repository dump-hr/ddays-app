import { Company } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchCompany = async (id: number) =>
  await api.get<never, Company>(`/companies/${id}`);

export const useFetchCompany = (id: number) => {
  return useQuery(['companies', id], () => fetchCompany(id));
};
