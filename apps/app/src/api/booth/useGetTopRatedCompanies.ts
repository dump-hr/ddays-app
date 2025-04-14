import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CompanyPublicDto } from '@ddays-app/types';

const getTopRatedCompanies = async (): Promise<
  CompanyPublicDto[]
> => {
  return axios.get('/company/top-rated');
};

export const useGetTopRatedCompanies= () => {
  return useQuery<CompanyPublicDto[]>(
    [QUERY_KEYS.topRatedCompanies],
    getTopRatedCompanies,
  );
};
