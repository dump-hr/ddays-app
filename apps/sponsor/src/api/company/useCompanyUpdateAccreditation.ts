import { useMutation, useQueryClient } from 'react-query';
import { api } from '..';
import toast from 'react-hot-toast';

const companyUpdateAccreditation = (listOfPeople: string[]) => {
  return api.patch(`company/accreditation`, listOfPeople);
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
      onError: (error: any) => {
        toast.error(error?.message || 'Došlo je do greške');
      },
    },
  );
};
