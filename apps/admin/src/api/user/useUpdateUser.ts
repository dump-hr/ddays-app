import { UserCreateForAccreditationDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const updateUser = (id: number, data: UserCreateForAccreditationDto) => {
  return api.patch<never, UserCreateForAccreditationDto>(`/user/${id}`, data);
};

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: UserCreateForAccreditationDto) => updateUser(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', id]);
        queryClient.invalidateQueries(['users']);
        toast.success('Korisnik uspješno ažuriran');
      },
      onError: () => {
        toast.error('Greška prilikom ažuriranja korisnika');
      },
    },
  );
};
