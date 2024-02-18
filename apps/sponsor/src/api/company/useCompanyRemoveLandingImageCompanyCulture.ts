import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemoveLandingImageCompanyCulture = async () => {
  return await api.delete('/company/landing-image-company-culture');
};

export const useCompanyRemoveLandingImageCompanyCulture = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemoveLandingImageCompanyCulture, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Slika uspješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
