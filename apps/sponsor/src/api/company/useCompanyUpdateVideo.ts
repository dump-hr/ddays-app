import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateVideo = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/company/video', data);
};

export const useCompanyUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateVideo, {
    onMutate: () => {
      return { toastId: toast.loading('Uploading video...') };
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Video uspješno uploadan', { id: context?.toastId });
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
