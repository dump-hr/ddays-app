import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerUpdateSmallPhoto = async (speakerFile: {
  id: number | undefined;
  file: File;
}) => {
  const data = new FormData();
  data.append('file', speakerFile.file);

  return await api.patchForm(`/speaker/small-photo/${speakerFile.id}`, data);
};

export const useSpeakerUpdateSmallPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerUpdateSmallPhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries(['speaker']);
      toast.success('Slika uspješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
