import { UserToEventDto } from '@ddays-app/types/src/dto/user';
import axios from 'axios';
import { useMutation } from 'react-query';

const eventAddToPersonalSchedule = (eventId: number, data: UserToEventDto) => {
  return axios.post(`/event/${eventId}/join`, data);
};

export const useEventAddToPersonalSchedule = () => {
  return useMutation((params: { eventId: number; data: UserToEventDto }) =>
    eventAddToPersonalSchedule(params.eventId, params.data),
  );
};
