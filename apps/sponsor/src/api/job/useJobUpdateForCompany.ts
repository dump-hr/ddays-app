import { JobDto, JobModifyForCompanyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const jobUpdateForCompany = async (jobs: JobModifyForCompanyDto[]) => {
  return await api.patch<{ jobs: JobModifyForCompanyDto[] }, JobDto[]>(
    '/job/company',
    { jobs },
  );
};

export const useJobUpdateForCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(jobUpdateForCompany, {
    onMutate: () => {
      return { toastId: toast.loading('Spremam poslove...') };
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries(['job']);
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Poslovi tvrtke uspješno spremljeni', {
        id: context?.toastId,
      });
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
