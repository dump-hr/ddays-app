import { CreateManyBoothsDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const createManyBooths = async (data: CreateManyBoothsDto) => {
  return await api.post<CreateManyBoothsDto, void>('/booth/many', data);
};

export const useCreateManyBooths = () => {
  const queryClient = useQueryClient();

  return useMutation(createManyBooths, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth']);
      toast.success('Booths successfully created!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
