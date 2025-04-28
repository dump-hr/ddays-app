import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { EventWithSpeakerDto } from '@ddays-app/types';

const getCurrentEvents = async (): Promise<EventWithSpeakerDto[]> => {
  return axios.get('/event/with-speaker');
};

export const useGetCurrentEvents = () => {
  return useQuery<EventWithSpeakerDto[]>(
    [QUERY_KEYS.events],
    getCurrentEvents,
  );
};
