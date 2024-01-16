import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const uploadLogo = (file: File) => {
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'image/svg+xml');

  return api.patch('/companies/logo', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadLogo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadLogo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);
      toast.success('Logo uspješno uploadan');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
