import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemoveVideo = async () => {
  return await api.delete('/company/video');
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useCompanyRemoveVideo = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemoveVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Video uspješno izbrisan');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
