import { EventDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const eventGetAll = () => {
  return api.get<never, EventDto[]>('/event');
};

export const useEventGetAll = (options?: QueryOptions<EventDto[]>) => {
  return useQuery(['event'], eventGetAll, options);
};
