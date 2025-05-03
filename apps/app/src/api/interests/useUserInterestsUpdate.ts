import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import axios from 'axios';
import { InterestDto } from '@ddays-app/types';
import { QUERY_KEYS } from '@/constants/queryKeys';

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
      queryClient.invalidateQueries([QUERY_KEYS.interests]);
      toast.success('User interests successfully updated!');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
