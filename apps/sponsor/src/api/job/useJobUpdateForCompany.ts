import { JobDto, JobModifyForCompanyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const jobUpdateForCompany = async (dto: JobModifyForCompanyDto[]) => {
  return await api.patch<JobModifyForCompanyDto[], JobDto[]>(
    '/job/company',
    dto,
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
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
