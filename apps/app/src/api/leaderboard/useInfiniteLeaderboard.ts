import { useInfiniteQuery } from 'react-query';
import axios from '../base';
import { LeaderboardResponseDto } from '@ddays-app/types/src/dto/leaderboard';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface LeaderboardParams {
  pageSize?: number;
}

export const useInfiniteLeaderboard = ({
  pageSize,
}: LeaderboardParams = {}) => {
  const getLeaderboard = async ({
    pageParam = 1,
  }): Promise<LeaderboardResponseDto> => {
    return axios.get<never, LeaderboardResponseDto>('leaderboard', {
      params: {
        page: pageParam,
        pageSize,
      },
    });
  };

  return useInfiniteQuery<
    LeaderboardResponseDto,
    Error,
    LeaderboardResponseDto
  >([QUERY_KEYS.leaderboard, pageSize], getLeaderboard, {
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage.page);
      const totalPages = Math.ceil(lastPage.totalEntries / lastPage.pageSize);

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: 'always', // Force refetch on every mount, even if data is in cache
  });
};
