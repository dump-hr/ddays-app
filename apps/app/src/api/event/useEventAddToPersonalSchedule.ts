import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const eventAddToPersonalSchedule = (eventId: number, data: UserToEventDto) => {
  return axios.post(`/api/event/${eventId}/join`, data);
};

export const useEventAddToPersonalSchedule = () => {
  return useMutation(
    (params: { eventId: number; data: UserToEventDto }) =>
      eventAddToPersonalSchedule(params.eventId, params.data),
    {
      onSuccess: () => {
        toast.success('Događaj je dodan u tvoj raspored.');
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data.message, {
            icon: '⚠️',
          });
        } else {
          toast.error('help');
        }
      },
    },
  );
};
