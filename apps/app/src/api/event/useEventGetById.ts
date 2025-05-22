import { EventWithSpeakerDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const eventGetById = (eventId: number) => {
  return axios.get<never, EventWithSpeakerDto>(`/event/${eventId}`);
};

export const useEventGetById = (
  eventId: number,
  options?: QueryOptions<EventWithSpeakerDto>,
) => {
  return useQuery(['event', eventId], () => eventGetById(eventId), options);
};
