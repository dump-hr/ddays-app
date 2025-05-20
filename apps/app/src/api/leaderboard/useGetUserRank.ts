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
      refetchOnWindowFocus: false,
      refetchOnMount: 'always', // Force refetch on every mount, even if data is in cache
    },
  );
};
