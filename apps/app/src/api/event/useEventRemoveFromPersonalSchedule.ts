import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import axios from '../base';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const eventRemoveFromPersonalSchedule = (
  eventId: number,
  data: UserToEventDto,
) => {
  return axios.delete(`event/${eventId}/leave`, { data });
};

export const useEventRemoveFromPersonalSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { eventId: number; data: UserToEventDto }) =>
      eventRemoveFromPersonalSchedule(params.eventId, params.data),
    {
      onSuccess: (_, params) => {
        toast.success('Događaj je uklonjen iz tvog rasporeda.');
        void queryClient.invalidateQueries([QUERY_KEYS.events]);
        void queryClient.invalidateQueries([QUERY_KEYS.eventsMySchedule]);
        void queryClient.invalidateQueries([
          QUERY_KEYS.eventParticipantsCount,
          params.eventId,
        ]);
      },
      onError: () => {
        toast.error(
          'Došlo je do pogreške prilikom uklanjanja događaja iz rasporeda.',
        );
      },
    },
  );
};
