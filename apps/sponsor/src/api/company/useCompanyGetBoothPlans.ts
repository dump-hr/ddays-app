import { CompanyBoothPlanDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '..';

const companyGetBoothPlans = async (): Promise<CompanyBoothPlanDto[]> => {
  const response = await api.get<CompanyBoothPlanDto[]>('/company/booth-plans');
  return response as unknown as CompanyBoothPlanDto[];
};

export const useCompanyGetBoothPlans = () => {
  return useQuery(['company', 'booth-plans'], companyGetBoothPlans);
};
