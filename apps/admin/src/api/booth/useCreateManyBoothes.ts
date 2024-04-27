import { CreateManyBoothsDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '..';

const createManyBoothes = async (data: CreateManyBoothsDto) => {
  return await api.post<CreateManyBoothsDto, void>('/booth/many', data);
};

export const useCreateManyBoothes = () => {
  return useMutation(createManyBoothes, {
    onSuccess: () => {
      toast.success('Boothes successfully created!');
    },
    onError: (error: string) => {
      toast.error('Failed to create boothes');
      console.error(error);
    },
  });
};
