import { BoothDto, BoothModifyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const createBooth = async (dto: BoothModifyDto): Promise<BoothDto> => {
  return await api.post<BoothModifyDto, BoothDto>('/booth', dto);
};

export const useCreateBooth = () => {
  const queryClient = useQueryClient();

  return useMutation(createBooth, {
    onSuccess: () => {
      queryClient.invalidateQueries(['booth']);
      toast.success('Booth successfully created!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
