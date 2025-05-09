import { useQuery } from 'react-query';
import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getEventParticipantsCount = async (eventId: number) => {
  return axios.get<never, { count: number }>(`/event/${eventId}/count`);
};

export const useEventGetParticipantsCount = (eventId: number) => {
  return useQuery(
    [QUERY_KEYS.eventParticipantsCount, eventId],
    () => getEventParticipantsCount(eventId),
    {
      enabled: !!eventId,
    },
  );
};
