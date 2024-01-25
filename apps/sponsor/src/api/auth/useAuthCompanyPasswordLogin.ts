import { CompanyPasswordLoginDto, JwtResponseDto } from '@ddays-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '..';

const authCompanyPasswordLogin = async (dto: CompanyPasswordLoginDto) => {
  return await api.post<CompanyPasswordLoginDto, JwtResponseDto>(
    '/auth/company/login',
    dto,
  );
};

export const useAuthCompanyPasswordLogin = (navigate: () => void) => {
  return useMutation(authCompanyPasswordLogin, {
    onMutate: () => {
      return { toastId: toast.loading('Logging in...') };
    },
    onSuccess: ({ accessToken }, _variables, context) => {
      localStorage.setItem('sponsorAccessToken', accessToken);
      toast.success('Logged in successfully!', { id: context?.toastId });

      navigate();
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
