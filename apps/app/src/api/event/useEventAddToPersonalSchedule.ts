import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const eventAddToPersonalSchedule = (eventId: number, data: UserToEventDto) => {
  return axios.post(`/api/event/${eventId}/join`, data);
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
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data.message, {
            icon: '⚠️',
          });
        } else {
          toast.error(
            'Došlo je do pogreške prilikom dodavanja događaja u raspored.',
          );
        }
      },
    },
  );
};
