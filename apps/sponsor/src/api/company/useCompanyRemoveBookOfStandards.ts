import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyRemoveBookOfStandards = async () => {
  return await api.delete('/company/book-of-standards');
};

export const useCompanyRemoveBookOfStandards = () => {
  const queryClient = useQueryClient();

  return useMutation(companyRemoveBookOfStandards, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Knjiga standarda uspješno izbrisana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
