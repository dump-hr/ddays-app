import { CodeDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const codeRemove = async (id: number) => {
  return await api.delete<never, CodeDto>(`/code/${id}`);
};

export const useCodeRemove = () => {
  const queryClient = useQueryClient();

  return useMutation(codeRemove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['code']);
      toast.success('Kod uspješno uklonjen!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
