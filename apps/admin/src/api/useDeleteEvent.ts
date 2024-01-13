import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteEvent = (eventId: number) =>
  api.delete<never, never>(`/events/${eventId}`);

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
      toast.success('Event uspješno obrisan!');
    },
    onError: () => {
      toast.error('Došlo je do greške!');
    },
  });
};
