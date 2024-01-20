import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteLogo = async () => {
  return await api.delete('/companies/logo');
};

export const useDeleteLogo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteLogo, {
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
