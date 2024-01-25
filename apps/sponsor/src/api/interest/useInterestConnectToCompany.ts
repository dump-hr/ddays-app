import { InterestConnectToCompanyDto, InterestDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const interestConnectToCompany = async (dto: InterestConnectToCompanyDto) => {
  return await api.patch<InterestConnectToCompanyDto, InterestDto[]>(
    '/interest/company',
    dto,
  );
};

// TODO: add loading toast like in useAuthCompanyPasswordLogin
export const useInterestConnectToCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(interestConnectToCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'current']);

      toast.success('Interesi tvrtke uspješno spremljeni');
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
