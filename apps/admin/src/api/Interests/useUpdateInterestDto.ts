import { getUpdateInterestDto, Interest } from '@ddays-app/types';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const _updateInterestDto = getUpdateInterestDto();

export class UpdateInterestDto extends _updateInterestDto {}

export const updatedInterest = async (params: {
  id: number;
  interest: UpdateInterestDto;
}) => {
  const action = await api.patch<UpdateInterestDto, Interest>(
    '/interests/' + params.id,
    params.interest,
  );

  return action;
};

export const useUpdateInterest = () => {
  const queryClient = useQueryClient();

  return useMutation(updatedInterest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['interests']);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
