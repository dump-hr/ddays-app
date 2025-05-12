import { EventWithSpeakerDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const eventGetMySchedule = async (): Promise<EventWithSpeakerDto[]> => {
  return axios.get<never, EventWithSpeakerDto[]>('/event/my-schedule');
};

export const useEventGetMySchedule = () => {
  return useQuery([QUERY_KEYS.eventsMySchedule], eventGetMySchedule);
};
