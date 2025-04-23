import { useInfiniteQuery } from 'react-query';
import axios from '../base';
import { LeaderboardResponseDto } from '@ddays-app/types/src/dto/leaderboard';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface LeaderboardParams {
  pageSize?: number;
  includeDeleted?: boolean;
}

export const useInfiniteLeaderboard = ({
  pageSize,
  includeDeleted = false,
}: LeaderboardParams = {}) => {
  const getLeaderboard = async ({
    pageParam = 1,
  }): Promise<LeaderboardResponseDto> => {
    return axios.get<never, LeaderboardResponseDto>('leaderboard', {
      params: {
        page: pageParam,
        pageSize,
        includeDeleted,
      },
    });
  };

  return useInfiniteQuery<
    LeaderboardResponseDto,
    Error,
    LeaderboardResponseDto
  >([QUERY_KEYS.leaderboard, pageSize, includeDeleted], getLeaderboard, {
    getNextPageParam: (lastPage) => {
      // Calculate if there are more pages to load
      const currentPage = Number(lastPage.page);
      const totalPages = Math.ceil(lastPage.totalEntries / lastPage.pageSize);

      // If we haven't reached the last page, return the next page number
      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      // Return undefined to indicate we've reached the end
      return undefined;
    },
    // Keep previous data when fetching new pages
    keepPreviousData: true,
    // Refetch when window is focused
    refetchOnWindowFocus: false,
  });
};
