import { EventDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const eventGetMySchedule = async (): Promise<EventDto[]> => {
  return axios.get<never, EventDto[]>('/event/my-schedule');
};

export const useEventGetMySchedule = () => {
  return useQuery([QUERY_KEYS.events, 'my-schedule'], eventGetMySchedule);
};
