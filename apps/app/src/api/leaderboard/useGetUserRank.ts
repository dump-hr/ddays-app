import { useQuery } from 'react-query';
import axios from '../base';
import { UserRankResponseDto } from '@ddays-app/types/src/dto/leaderboard';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getUserRank = async (): Promise<UserRankResponseDto> => {
  return axios.get<never, UserRankResponseDto>('leaderboard/me');
};

export const useGetUserRank = () => {
  return useQuery<UserRankResponseDto>(
    QUERY_KEYS.leaderboardUserRank,
    getUserRank,
    {
      refetchOnWindowFocus: true,
      staleTime: 60000, // 1 minute
    },
  );
};
