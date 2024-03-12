import { EventDto, EventModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const eventUpdate = async (dto: EventModifyDto & { id: number }) => {
  return await api.patch<EventModifyDto, EventDto>(`/event/${dto.id}`, {
    ...dto,
    id: undefined,
  });
};

export const useEventUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(eventUpdate, {
    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries(['event']);
      queryClient.invalidateQueries(['event', updatedEvent.id]);
      toast.success('Uređivanje eventa uspješno izvršeno!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
