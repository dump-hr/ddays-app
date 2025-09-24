import { CompanyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemove = async (id: number) => {
  return await api.delete<never, CompanyDto>(`/company/${id}`);
};

export const useCompanyRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company']);
      toast.success('Firma uspješno uklonjena!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
