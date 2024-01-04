import { getCreateEventDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

type Event = InstanceType<ReturnType<typeof getCreateEventDto>> & {
  id: number;
};

const fetchEvent = async (id: number) =>
  await api.get<number, Event>(`/events/${id}`);

export const useFetchEvent = (eventId: number) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: () => fetchEvent(eventId),
  });
};
