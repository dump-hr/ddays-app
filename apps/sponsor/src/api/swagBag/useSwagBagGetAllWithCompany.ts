import { SwagBagWithCompanyDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const swagBagGetAllWithCompany = async (): Promise<SwagBagWithCompanyDto[]> => {
  return api.get<never, SwagBagWithCompanyDto[]>(`/swag-bag/all/company`);
};

export const useSwagBagGetAllWithCompany = () => {
  return useQuery<SwagBagWithCompanyDto[]>(
    ['swagBagsWithCompany'],
    swagBagGetAllWithCompany,
  );
};
