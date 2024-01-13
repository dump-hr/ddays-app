import { getCreateEventDto } from '@ddays-app/types';
import { getUpdateEventDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type Event = InstanceType<ReturnType<typeof getCreateEventDto>> & {
  id: number;
};

type UpdateEventDto = InstanceType<ReturnType<typeof getUpdateEventDto>>;

const editEvent = async ({ id, ...newEvent }: Event) =>
  await api.patch<UpdateEventDto, never>(`/events/${id}`, newEvent);

export const useEditEvents = () => {
  const queryClient = useQueryClient();

  return useMutation(editEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
      toast.success('Event uspješno promijenjen!');
    },
    onError: () => {
      toast.error('Došlo je do greške!');
    },
  });
};
