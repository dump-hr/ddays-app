import { CompanyPublicDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const companyGetAllPublic = async () => {
  return (await api.get<CompanyPublicDto[]>('/company')).data;
};

export const useCompanyGetAllPublic = () => {
  return useQuery(['company', 'all-public'], companyGetAllPublic);
};
