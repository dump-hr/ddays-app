import { EventDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const eventGetOne = async (id: number) => {
  return await api.get<never, EventDto>(`/event/${id}`);
};

export const useEventGetOne = (
  id?: number,
  options?: QueryOptions<EventDto>,
) => {
  return useQuery(['event', id], () => eventGetOne(id!), {
    enabled: !!id,
    ...options,
  });
};
