import { CompanyDto, CompanyModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyCreate = async (dto: CompanyModifyDto) => {
  console.log('dto: ', dto);

  return await api.post<CompanyModifyDto, CompanyDto>('/company', dto);
};

export const useCompanyCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(companyCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company']);
      toast.success('Firma uspješno dodana!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
