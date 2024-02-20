import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateBookOfStandards = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  console.log('data', data);

  return await api.patchForm('company/book-of-standards', data);
};

export const useCompanyUpdateBookOfStandards = () => {
  const queryClient = useQueryClient();

  return useMutation(companyUpdateBookOfStandards, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);
      toast.success('Knjiga standarda uspješno uploadana');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
