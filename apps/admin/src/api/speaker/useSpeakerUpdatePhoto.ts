import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerUpdatePhoto = async (speakerFile: {
  id: number | undefined;
  file: File;
}) => {
  const data = new FormData();
  data.append('file', speakerFile.file);

  return await api.patchForm(`/speaker/photo/${speakerFile.id}`, data);
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
