import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteVideo = async () => {
  return await api.delete('/companies/video');
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);

      toast.success('Video uspješno izbrisan');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
