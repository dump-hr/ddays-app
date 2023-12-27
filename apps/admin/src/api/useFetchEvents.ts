import { useQuery } from 'react-query';

import { api } from '.';

type Event = {
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
  requirements: string;
  footageLink: string;
  eventType: string;
  eventTheme: string;
  eventPlace: string;
  codeId: number;
  id: number;
};

const fetchAllEvents = async () => await api.get<never, Event[]>('/events');

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchAllEvents,
  });
};
