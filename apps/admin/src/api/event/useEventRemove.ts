import { EventDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const eventRemove = async (id: number) => {
  return await api.delete<never, EventDto>(`/event/${id}`);
};

export const useEventRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(eventRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['event ']);
      toast.success('Event uspješno uklonjen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
