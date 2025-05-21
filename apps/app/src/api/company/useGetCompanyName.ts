import { CompanyDto } from '@ddays-app/types';
import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getCompany = (companyId: number): Promise<CompanyDto> => {
  return axios.get(`/company/${companyId}`);
};

export const useGetCompanyName = (companyId: number): string | undefined => {
  const company = useQuery(
    [QUERY_KEYS.company, companyId],
    () => getCompany(companyId),
    {
      enabled: !!companyId,
    },
  );

  return company.data?.name;
};
