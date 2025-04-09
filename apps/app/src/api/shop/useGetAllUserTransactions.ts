import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { TransactionItemResponseDto } from '@ddays-app/types/src/dto/shop';

const getAllUserTransactions = async (
  userId: number,
): Promise<TransactionItemResponseDto[]> => {
  return axios.get(`/shop/transactions/${userId}`);
};

export const useGetAllUserTransactions = (userId: number) => {
  return useQuery<TransactionItemResponseDto[]>(
    [QUERY_KEYS.userTransactions],
    () => getAllUserTransactions(userId),
    {
      enabled: !!userId, // Only run the query if userId is available
    },
  );
};
