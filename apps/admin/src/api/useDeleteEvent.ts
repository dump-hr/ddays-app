import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteEvent = async () => await api.delete<number, never>('/events');

export const useFetchEvents = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};
