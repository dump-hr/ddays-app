import { CompanyPublicDto } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateBoothPlan = async (data: { boothPlan: string }) => {
  return await api.patch<CompanyPublicDto, { boothPlan: string }>(
    '/company/booth-plan',
    data,
  );
};

export const useCompanyUpdateBoothPlan = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateBoothPlan, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      queryClient.invalidateQueries(['company', 'all-public']);
    },
  });
};
