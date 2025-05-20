import { useQuery } from 'react-query';
import { api } from '..';

import { UserPublicDto } from '@ddays-app/types/src/dto/user';

const getUser = (id: number) => {
  return api.get<never, Partial<UserPublicDto>>(`/user/${id}`);
};

export const useGetOneUser = (id: number) => {
  return useQuery(['user', id], () => getUser(id));
};
