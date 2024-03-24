import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerRemovePhoto = async (id: number) => {
  return await api.delete(`/speaker/photo/${id}`);
};

export const useSpeakerRemovePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerRemovePhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries(['speaker']);
      toast.success('Slika uspješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
