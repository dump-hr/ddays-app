import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const uploadImage = (file: File) => {
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'image/*');

  return api.patch('/companies/landing-image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);
      toast.success('Slika uspješno uploadna');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
