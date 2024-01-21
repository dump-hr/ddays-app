import { CompanyModifyDescriptionDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateDescription = async (dto: CompanyModifyDescriptionDto) => {
  return await api.patch<CompanyModifyDescriptionDto, never>(
    '/company/description',
    dto,
  );
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyUpdateDescription = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateDescription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Opis tvrtke uspješno spremljen');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
