import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemoveLogoImage = async () => {
  return await api.delete('/company/logo-image');
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyRemoveLogoImage = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemoveLogoImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Logo uspješno izbrisan');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
