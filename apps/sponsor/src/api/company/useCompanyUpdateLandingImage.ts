import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateLandingImage = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/company/landing-image', data);
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyUpdateLandingImage = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateLandingImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Slika uspješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
