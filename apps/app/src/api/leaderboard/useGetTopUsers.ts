import { useQuery } from 'react-query';
import axios from '../base';
import { LeaderboardEntryDto } from '@ddays-app/types/src/dto/leaderboard';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getTopUsers = async (): Promise<LeaderboardEntryDto[]> => {
  return axios.get<never, LeaderboardEntryDto[]>('/leaderboard/top');
};

export const useGetTopUsers = () => {
  return useQuery<LeaderboardEntryDto[]>(
    QUERY_KEYS.leaderboardTop,
    getTopUsers,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
    },
  );
};
