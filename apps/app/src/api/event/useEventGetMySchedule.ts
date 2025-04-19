import { EventDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const eventGetMySchedule = async (): Promise<EventDto[]> => {
  const response = await axios.get('/event/my-schedule');
  console.log('response', response.data);
  return response.data;
};

export const useEventGetMySchedule = () => {
  return useQuery([QUERY_KEYS.events, 'my-schedule'], eventGetMySchedule);
};
