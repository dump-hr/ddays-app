import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const eventAddToPersonalSchedule = (eventId: number, data: UserToEventDto) => {
  return axios.post(`event/${eventId}/join`, data);
};

export const useEventAddToPersonalSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { eventId: number; data: UserToEventDto }) =>
      eventAddToPersonalSchedule(params.eventId, params.data),
    {
      onSuccess: () => {
        toast.success('Događaj je dodan u tvoj raspored.');
        void queryClient.invalidateQueries([QUERY_KEYS.events]);
      },
      onError: (error: string) => {
        toast(error, {
          icon: '⚠️',
        });
      },
    },
  );
};
