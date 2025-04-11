import { useMutation, useQueryClient } from 'react-query';
import axios from '../base';
import toast from 'react-hot-toast';
import {
  TransactionCreateDto,
  TransactionItemDto,
} from '@ddays-app/types/src/dto/shop';
import { QUERY_KEYS } from '@/constants/queryKeys';

const buyShopItems = async (
  transactionCreateDtos: TransactionCreateDto[],
): Promise<TransactionItemDto[]> => {
  return axios.post('/shop/buy', transactionCreateDtos);
};

export const useBuyShopItem = () => {
  const queryClient = useQueryClient();

  return useMutation(buyShopItems, {
    onSuccess: (data: TransactionItemDto[]) => {
      // Show success for first item or generic message
      const itemName = data.length > 0 ? data[0].shopItem.itemName : 'Artikli';

      const message =
        data.length === 1
          ? `Artikl ${itemName} je kupljen`
          : `${data.length} artikla su kupljena`;

      toast.success(message);

      void queryClient.invalidateQueries([QUERY_KEYS.shopItems]);
      void queryClient.invalidateQueries([QUERY_KEYS.userTransactions]);
      void queryClient.invalidateQueries([QUERY_KEYS.userPoints]);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
