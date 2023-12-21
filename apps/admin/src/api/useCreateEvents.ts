import { getCreateEventDto } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const CreateEventDto = getCreateEventDto();

const createEvent = async (newEvent: typeof CreateEventDto) =>
  await api.post<Event, never>('/events', newEvent);

export const useCreateEvents = () => {
  const queryClient = useQueryClient();

  return useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};
