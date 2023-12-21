import { useQuery } from 'react-query';

import { api } from '.';

type Event = {
  id: number;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
};

const fetchAllEvents = async () => await api.get<never, Event[]>('/events');

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchAllEvents,
  });
};
