import { SpeakerDto, SpeakerModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerUpdate = async (dto: SpeakerModifyDto & { id: number }) => {
  return await api.patch<SpeakerModifyDto, SpeakerDto>(`/speaker/${dto.id}`, {
    ...dto,
    id: undefined,
  });
};

export const useSpeakerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerUpdate, {
    onSuccess: (updatedSpeaker) => {
      queryClient.invalidateQueries(['speaker']);
      queryClient.invalidateQueries(['speaker', updatedSpeaker.id]);
      toast.success('Uređivanje speakera uspješno izvršeno!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
