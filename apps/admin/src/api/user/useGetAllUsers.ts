import { useQuery } from 'react-query';
import { UserPublicDto } from '@ddays-app/types/src/dto/user';

import { api } from '../index';

const getAllUsers = () => {
  return api.get<never, Partial<UserPublicDto>[]>('/user/all');
};

export const useGetAllUsers = () => {
  return useQuery(['users'], getAllUsers);
};
