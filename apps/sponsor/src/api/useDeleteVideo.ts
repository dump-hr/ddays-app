import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteVideo = async () => {
  return await api.delete('/company/video');
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteVideo, {
    onSuccess: () => {
      toast.success('Video uspješno izbrisan');

      queryClient.invalidateQueries(['loggedCompany']);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
