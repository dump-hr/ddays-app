import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { UpdateSponsorDescriptionDto } from '../types/company';
import { api } from '.';

const updateSponsorDescription = async (dto: UpdateSponsorDescriptionDto) => {
  return await api.patch('/company/description', dto);
};

export const useUpdateSponsorDescription = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSponsorDescription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sponsorFormStatus']);
      toast.success('Opis tvrtke uspješno spremljen');
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};
