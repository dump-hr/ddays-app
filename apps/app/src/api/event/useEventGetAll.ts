import { EventDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const eventGetAll = () => {
  return axios.get<never, EventDto[]>('/event');
};

export const useEventGetAll = (options?: QueryOptions<EventDto[]>) => {
  return useQuery(['event'], eventGetAll, options);
};
