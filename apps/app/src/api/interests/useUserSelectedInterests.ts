import { QUERY_KEYS } from '@/constants/queryKeys';
import { InterestDto } from '@ddays-app/types';
import axios from 'axios';
import { useQuery } from 'react-query';

const getUserSelectedInterests = async (
  userId: number,
): Promise<InterestDto[]> => {
  const response = await axios.get(`/api/interest/user/${userId}`);
  return response.data;
};

export const useUserSelectedInterests = (userId: number) => {
  return useQuery(
    [QUERY_KEYS.userSelectedInterests, userId],
    () => getUserSelectedInterests(userId),
    {
      enabled: !!userId,
    },
  );
};
