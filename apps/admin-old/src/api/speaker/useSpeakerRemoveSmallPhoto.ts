import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerRemoveSmallPhoto = async (id: number | undefined) => {
  return await api.delete(`/speaker/small-photo/${id}`);
};

export const useSpeakerRemoveSmallPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerRemoveSmallPhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries(['speaker']);
      toast.success('Slika uspješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
