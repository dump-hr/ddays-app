import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateLogoImage = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/company/logo-image', data);
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyUpdateLogoImage = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateLogoImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Logo uspješno uploadan');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
