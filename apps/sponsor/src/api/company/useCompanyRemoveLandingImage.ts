import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemoveLandingImage = async () => {
  return await api.delete('/company/landing-image');
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyRemoveLandingImage = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemoveLandingImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Slika uspješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
