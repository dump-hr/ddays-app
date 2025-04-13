import { QueryClient, useMutation } from 'react-query';
import axios from '../base';
import toast from 'react-hot-toast';
import { TransactionItemDto } from '@ddays-app/types/src/dto/shop';
import { QUERY_KEYS } from '@/constants/queryKeys';

const queryClient = new QueryClient();

const verifyTransactionItem = async (
  id: number,
): Promise<TransactionItemDto> => {
  return axios.patch(`/shop/transaction/${id}/verify`);
};

export const useVerifyTransactionItem = () => {
  return useMutation(verifyTransactionItem, {
    onSuccess: () => {
      toast.success(`Vaša transakcija je verificirana!`);
      queryClient.invalidateQueries([QUERY_KEYS.userTransactions]);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
