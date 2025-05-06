import { useMutation, useQueryClient } from 'react-query';
import axios from '../base';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/constants/queryKeys';

const deleteFlyTalkApplication = async ({
  eventId,
}: {
  eventId: number;
}): Promise<{ eventId: number }> => {
  return axios.delete('/event/delete-flytalk-application', {
    data: { eventId },
  });
};

export const useDeleteFlyTalkApplication = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFlyTalkApplication, {
    onSuccess: () => {
      queryClient.refetchQueries([QUERY_KEYS.flyTalkGroups]);
      toast.success('Termin je uspješno odjavljen.');
    },
    onError: (error: import('axios').AxiosError<{ message?: string }>) => {
      console.error('Došlo je do greške: ', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Došlo je do greške.';
      toast.error(errorMessage);
    },
  });
};
