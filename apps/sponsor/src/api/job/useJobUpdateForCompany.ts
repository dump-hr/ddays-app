import { JobDto, JobModifyForCompanyDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const jobUpdateForCompany = async (dto: JobModifyForCompanyDto[]) => {
  return await api.patch<JobModifyForCompanyDto[], JobDto>('/job/company', dto);
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useJobUpdateForCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(jobUpdateForCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(['job']);
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Poslovi tvrtke uspješno spremljeni');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
