import { Interest } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

export const deletedInterest = async (id: number) => {
  const action = await api.delete<never, Interest>('/interests/' + id);

  return action;
};

export const useDeleteInterest = () => {
  const queryClient = useQueryClient();

  return useMutation(deletedInterest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['interests']);
    },
  });
};
