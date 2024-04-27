import { BoothDto, CreateBoothDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '..';

const createBooth = async (dto: CreateBoothDto): Promise<BoothDto> => {
  return await api.post<CreateBoothDto, BoothDto>('/booth', dto);
};

export const useCreateBooth = () => {
  return useMutation(createBooth, {
    onSuccess: () => {
      toast.success('Booth successfully created!');
    },
    onError: (error: string) => {
      toast.error('Failed to create booth');
      console.error(error);
    },
  });
};
