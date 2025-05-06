import { useQuery } from 'react-query';

import { api } from '..';
import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';

export const getApplicants = async () => {
  return await api.get<never, UserToCompanyDto[]>('/company/applicants');
};

export const useGetApplicants = () => {
  return useQuery(['applicants'], getApplicants);
};
