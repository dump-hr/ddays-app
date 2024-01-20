import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteImage = async () => {
  return await api.delete('/companies/landing-image');
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);

      toast.success('Slika uspješno izbrisana');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
