import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { api } from '../index';
import { TransactionItemDto } from '@ddays-app/types/src/dto/shop';

const verifyTransactionItem = async (dto: {
  itemId: number;
  userId: number;
}): Promise<TransactionItemDto> => {
  return api.patch(`/shop/transaction/verify`, dto);
};

export const useVerifyTransactionItem = () => {
  return useMutation(verifyTransactionItem, {
    onSuccess: () => {
      toast.success(`Vaša transakcija je verificirana!`);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
