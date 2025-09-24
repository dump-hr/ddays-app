import { UserCreateForAccreditationDto } from '@ddays-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '..';

const createUser = (data: UserCreateForAccreditationDto) => {
  return api.post<never, UserCreateForAccreditationDto>('/user', data);
};

export const useCreateUser = () => {
  const queryClinet = useQueryClient();

  return useMutation(createUser, {
    onSuccess: () => {
      queryClinet.invalidateQueries(['users']);
      toast.success('Korisnik uspješno dodan');
    },
    onError: () => {
      toast.error('Greška prilikom dodavanja korisnika');
    },
  });
};
