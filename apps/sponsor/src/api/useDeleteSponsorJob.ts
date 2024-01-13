import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteSponsorJob = async (id: number) => {
  return await api.delete(`/jobs/${id}`);
};

export const useDeleteSponsorJob = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => deleteSponsorJob(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);

      toast.success('Oglas za posao uspješno uklonjen');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  return { ...mutation };
};
