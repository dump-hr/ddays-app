import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import axios from 'axios';
import { InterestDto } from '@ddays-app/types';

const userInterestsUpdate = async (interests: InterestDto[]) => {
  const accessToken = localStorage.getItem('accessToken');
  return await axios.patch<InterestDto[], InterestDto[]>(
    `/api/user/interests`,
    interests,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
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
