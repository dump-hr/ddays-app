import { getCreateEventDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type Event = InstanceType<ReturnType<typeof getCreateEventDto>>;

const createEvent = async (newEvent: Event) =>
  await api.post<Event, never>('/events', newEvent);

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
      toast.success('Event uspješno dodan!');
    },
    onError: () => {
      toast.error('Došlo je do greške!');
    },
  });
};