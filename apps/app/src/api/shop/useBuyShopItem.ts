import { QueryClient, useMutation } from 'react-query';
import axios from '../base';
import toast from 'react-hot-toast';
import {
  TransactionCreateDto,
  TransactionItemDto,
} from '@ddays-app/types/src/dto/shop';
import { QUERY_KEYS } from '@/constants/queryKeys';

const queryClient = new QueryClient();

const buyShopItem = async (
  transactionCreateDto: TransactionCreateDto,
): Promise<TransactionItemDto> => {
  return axios.post('/shop/buy', transactionCreateDto);
};

export const useBuyShopItem = () => {
  return useMutation(buyShopItem, {
    onSuccess: (data: TransactionItemDto) => {
      toast.success(`Artikl ${data.shopItem.itemName} je kupljen`);

      void queryClient.invalidateQueries([
        QUERY_KEYS.shopItems,
        QUERY_KEYS.userTransactions,
      ]);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
