import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemoveLogo = async () => {
  return await api.delete('/company/logo');
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyRemoveLogo = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemoveLogo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Logo uspješno izbrisan');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });
};
