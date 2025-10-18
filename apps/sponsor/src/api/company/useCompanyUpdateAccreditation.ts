import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const companyUpdateAccreditation = (listOfPeople: string[]) => {
  return api.patch('company/accreditation', listOfPeople);
};

export const useCompanyUpdateAccreditation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (listOfPeople: string[]) => companyUpdateAccreditation(listOfPeople),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['company']);
        toast.success('Osobe uspješno spremljene');
      },
      onError: (error: string) => {
        toast.error(error || 'Došlo je do greške');
      },
    },
  );
};
