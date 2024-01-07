import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { UpdateSponsorInterestsDto } from '../types/interest';
import { api } from '.';

const updateSponsorInterests = async (req: UpdateSponsorInterestsDto) =>
  await api.put<UpdateSponsorInterestsDto, number>('/interests/sponsor', req);

export const useUpdateSponsorInterests = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSponsorInterests, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorInterests']);
      queryClient.invalidateQueries(['sponsorFormStatus']);
      toast.success('Interesi pohranjeni');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
