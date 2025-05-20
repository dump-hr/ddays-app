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
      onSuccess: (_, params) => {
        toast.success('Događaj je dodan u tvoj raspored.');
        void queryClient.invalidateQueries([QUERY_KEYS.events]);
        void queryClient.invalidateQueries([QUERY_KEYS.eventsMySchedule]);
        void queryClient.invalidateQueries([
          QUERY_KEYS.eventParticipantsCount,
          params.eventId,
        ]);
      },
      onError: () => {
        toast.error(
          'Došlo je do pogreške prilikom dodavanja događaja u raspored.',
        );
      },
    },
  );
};
