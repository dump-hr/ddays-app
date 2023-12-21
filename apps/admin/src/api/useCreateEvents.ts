import { getCreateEventDto } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type Event = InstanceType<ReturnType<typeof getCreateEventDto>>;

const createEvent = async (newEvent: Event) =>
  await api.post<Event, never>('/events', newEvent);

export const useCreateEvents = () => {
  const queryClient = useQueryClient();

  return useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};
