import { getCreateInterestDto, Interest } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const _createInterestDto = getCreateInterestDto();

export class CreateInterestDto extends _createInterestDto {}

export const createdInterest = async (dto: CreateInterestDto) => {
  const action = await api.post<CreateInterestDto, Interest>(
    '/interests/',
    dto,
  );

  return action;
};

export const useDeleteInterest = () => {
  const queryClient = useQueryClient();

  return useMutation(createdInterest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['interests']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
