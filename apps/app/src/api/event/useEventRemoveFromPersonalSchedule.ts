import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const eventRemoveFromPersonalSchedule = (
  eventId: number,
  data: UserToEventDto,
) => {
  return axios.delete(`/api/event/${eventId}/leave`, { data });
};

export const useEventRemoveFromPersonalSchedule = () => {
  return useMutation(
    (params: { eventId: number; data: UserToEventDto }) =>
      eventRemoveFromPersonalSchedule(params.eventId, params.data),
    {
      onSuccess: () => {
        toast.success('Događaj je uklonjen iz tvog rasporeda.');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data.message, {
            icon: '⚠️',
          });
        } else {
          toast.error(
            'Došlo je do pogreške prilikom uklanjanja događaja iz rasporeda.',
          );
        }
      },
    },
  );
};
