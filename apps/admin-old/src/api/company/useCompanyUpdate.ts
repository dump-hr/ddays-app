import { CompanyDto, CompanyModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdate = async (dto: CompanyModifyDto & { id: number }) => {
  return await api.patch<CompanyModifyDto, CompanyDto>(`/company/${dto.id}`, {
    ...dto,
    id: undefined,
  });
};

export const useCompanyUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdate, {
    onSuccess: (updatedCompany) => {
      queryClient.invalidateQueries(['company']);
      queryClient.invalidateQueries(['company', updatedCompany.id]);
      toast.success('Firma uspješno uređena!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
