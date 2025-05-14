import { CompanyDto } from '@ddays-app/types';
import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getCompanyPublic = (companyId: number): Promise<CompanyDto> => {
  return axios.get(`/company/${companyId}`);
};

export const useGetCompanyLogo = (
  companyId: number | undefined,
): string | undefined => {
  if (!companyId) {
    return undefined;
  }

  const company = useQuery(
    [QUERY_KEYS.company],
    () => getCompanyPublic(companyId),
    {
      enabled: !!companyId,
    },
  );
  console.log(company.data?.logoImage);
  return company.data?.logoImage;
};
