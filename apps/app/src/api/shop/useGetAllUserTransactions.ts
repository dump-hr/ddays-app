import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { TransactionItemResponseDto } from '@ddays-app/types/src/dto/shop';

const getAllUserTransactions = async (): Promise<
  TransactionItemResponseDto[]
> => {
  return axios.get(`/shop/transactions/user`);
};

export const useGetAllUserTransactions = () => {
  return useQuery<TransactionItemResponseDto[]>(
    [QUERY_KEYS.userTransactions],
    getAllUserTransactions,
  );
};
