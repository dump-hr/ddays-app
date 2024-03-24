import { SpeakerDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerRemove = async (id: number) => {
  return await api.delete<never, SpeakerDto>(`/spekaer/${id}`);
};

export const useSpeakerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['speaker']);
      toast.success('Speaker uspješno uklonjen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
