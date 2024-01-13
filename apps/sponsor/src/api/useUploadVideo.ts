import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const uploadVideo = async (file: File) => {
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'video/mp4');

  return await api.patch('/companies/video', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);
      toast.success('Video uspješno uploadan');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
