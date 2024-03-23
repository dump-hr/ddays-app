import { SpeakerDto, SpeakerModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const speakerCreate = async (dto: SpeakerModifyDto) => {
  return await api.post<SpeakerModifyDto, SpeakerDto>('/speaker', dto);
};

export const useSpeakerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(speakerCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['speaker']);
      toast.success('Speaker uspješno dodan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
