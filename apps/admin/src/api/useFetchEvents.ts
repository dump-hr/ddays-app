import { useQuery } from 'react-query';

import { api } from '.';

type Event = {
  id: number;
  name: string;
  description: string;
  eventType: string;
  eventTheme: string;
  eventPlace: string;
  startsAt: string;
  endsAt: string;
  requirements: string;
  footageLink: string;
  maxParticipants: number;
  codeId: number;
};

const fetchAllEvents = async () => await api.get<never, Event[]>('/events');

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchAllEvents,
  });
};
