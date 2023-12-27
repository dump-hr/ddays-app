import { EventPlace, EventTheme, EventType } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

type DetailedEvent = {
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
  requirements: string;
  footageLink: string;
  eventType: EventType;
  eventTheme: EventTheme;
  eventPlace: EventPlace;
  codeId: number;
  id: number;
};

const fetchEvent = async (id: number) =>
  await api.get<number, DetailedEvent>(`/events/${id}`);

export const useFetchEvent = (eventId: number) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: () => fetchEvent(eventId),
  });
};
