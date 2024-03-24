import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerUpdatePhoto = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  return await api.patchForm('/speaker/photo', data);
};

export const useSpeakerUpdatePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerUpdatePhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries(['speaker']);
      toast.success('Slika uspješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
