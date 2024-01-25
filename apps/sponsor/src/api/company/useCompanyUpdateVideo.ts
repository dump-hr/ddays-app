import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateVideo = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/company/video', data);
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Video uspješno uploadan');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
