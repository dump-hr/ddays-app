import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import axios from '../base';
import { InterestDto } from '@ddays-app/types';

const userInterestsUpdate = (interests: InterestDto[]) => {
  return axios.patch<InterestDto[], InterestDto[]>(
    `/user/interests`,
    interests,
  );
};

export const useUserInterestsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation(userInterestsUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
