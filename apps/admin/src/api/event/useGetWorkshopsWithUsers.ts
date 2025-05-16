import { EventWithUsersDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const getWorkshopsWithUsers = () => {
  return api.get<never, EventWithUsersDto[]>('event/workshops-with-users');
};

export const useGetWorkshopsWithUsers = (
  options?: QueryOptions<EventWithUsersDto[]>,
) => {
  return useQuery(['workshops-with-users'], getWorkshopsWithUsers, options);
};
