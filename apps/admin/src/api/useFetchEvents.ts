import { getCreateEventDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

type Event = InstanceType<ReturnType<typeof getCreateEventDto>> & {
  id: number;
};

const fetchAllEvents = async () => await api.get<never, Event[]>('/events');

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchAllEvents,
  });
};
