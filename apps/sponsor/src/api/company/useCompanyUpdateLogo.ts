import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateLogo = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/company/logo', data);
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyUpdateLogo = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateLogo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Logo uspješno uploadan');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });
};
