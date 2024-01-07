import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const deleteCompany = async (id: number) => api.delete(`/companies/${id}`);

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCompany, {
    onSuccess: () => {
      toast.success('Company deleted');
      queryClient.invalidateQueries(['company']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
