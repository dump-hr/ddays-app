import { EventDto, EventModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const eventCreate = async (dto: EventModifyDto) => {
  console.log(typeof dto.startsAt);
  return await api.post<EventModifyDto, EventDto>('/event', dto);
};

export const useEventCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(eventCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['event']);
      toast.success('Event uspješno dodan!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
