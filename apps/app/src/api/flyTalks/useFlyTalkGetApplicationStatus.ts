import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getFlyTalkApplicationStatus = async (
  flyTalkId: number,
): Promise<boolean | undefined> => {
  return axios.get(`/event/application-status/${flyTalkId}`);
};

export const useGetFlyTalkApplicationStatus = (flyTalkId: number) => {
  return useQuery<boolean | undefined>(
    [QUERY_KEYS.flyTalkApplicationStatus, flyTalkId],
    () => getFlyTalkApplicationStatus(flyTalkId),
  );
};
