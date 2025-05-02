import { QueryClient, useMutation } from 'react-query';
import axios from '../base';
import { QUERY_KEYS } from '@/constants/queryKeys';
import toast from 'react-hot-toast';

const queryClient = new QueryClient();

const deleteFlyTalkApplication = async (
  { eventId }: { eventId: number },
): Promise<{ eventId: number }> => {
  return axios.delete('/event/delete-flytalk-application', {
    data: { eventId },
  });
};

export const useDeleteFlyTalkApplication = () => {
  return useMutation(deleteFlyTalkApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.applyFlyTalk]);
      toast.success('Successfully deleted the application.');
    },
    onError: (error: import('axios').AxiosError<{ message?: string }>) => {
      console.error('Error deleting FlyTalk application:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'An unexpected error occurred.';
      toast.error(errorMessage);
    },
  });
};
