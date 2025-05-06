import { useQueryClient, useMutation } from 'react-query';
import { api } from '..';
import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';

export const usePatchSelectedApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ user, selected }: { user: UserToCompanyDto; selected: boolean }) =>
      api.patch('/company/select-applicant', { user, selected }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['applicants']);
      },
      onError: (error) => {
        console.error('Greška prilikom odabira kandidata', error);
      },
    }
  );
};
