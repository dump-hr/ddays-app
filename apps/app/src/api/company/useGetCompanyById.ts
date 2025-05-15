import { CompanyPublicDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const companyGetById = (id: number) => {
  return axios.get<never, CompanyPublicDto>(`/company/${id}`);
};

export const useCompanyGetById = (
  id: number,
  options?: QueryOptions<CompanyPublicDto>,
) => {
  return useQuery(['company', id], () => companyGetById(id), options);
};
