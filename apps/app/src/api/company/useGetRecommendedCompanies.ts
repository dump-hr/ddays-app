import { CompanyPublicDto } from '@ddays-app/types';
import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getRecommendedCompanies = async (): Promise<CompanyPublicDto[]> => {
  return await axios.get('/company/recommended');
};

export const useGetRecommendedCompanies = () => {
  return useQuery([QUERY_KEYS.companies], getRecommendedCompanies);
};
