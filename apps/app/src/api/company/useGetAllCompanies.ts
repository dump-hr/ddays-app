import { CompanyDto } from '@ddays-app/types';
import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getAllCompanies = async (): Promise<CompanyDto[]> => {
  return await axios.get('/company');
};

export const useGetAllCompanies = () => {
  return useQuery([QUERY_KEYS.companies], getAllCompanies);
};
