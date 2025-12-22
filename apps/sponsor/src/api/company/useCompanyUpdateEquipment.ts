import { CompanyPublicDto } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const useCompanyUpdateEquipment = () => {
  const query = useQueryClient();

  return useMutation(
    async (data: { equipment: string }) => {
      const response = await api.patch<
        { equipment: string },
        CompanyPublicDto
      >('/company/equipment', data);
      return response;
    },
    {
      onSuccess: () => {
        query.invalidateQueries('company');
      },
    },
  );
};
