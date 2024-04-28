import { CreateManyBoothsDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '..';

const createManyBooths = async (data: CreateManyBoothsDto) => {
  return await api.post<CreateManyBoothsDto, void>('/booth/many', data);
};

export const useCreateManyBooths = () => {
  return useMutation(createManyBooths, {
    onSuccess: () => {
      toast.success('Booths successfully created!');
    },
    onError: (error: string) => {
      toast.error('Failed to create booths');
      console.error(error);
    },
  });
};
