import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { AddSponsorJobDto } from '../types/company';
import { api } from '.';

const addSponsorJob = async (dto: AddSponsorJobDto) => {
  return await api.post('/jobs', dto);
};

export const useAddSponsorJob = () => {
  const queryClient = useQueryClient();

  return useMutation(addSponsorJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorJobs']);
      queryClient.invalidateQueries(['sponsorFormStatus']);
      queryClient.invalidateQueries(['loggedCompany']);

      toast.success('Poslovi tvrtke uspješno spremljen');
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};
