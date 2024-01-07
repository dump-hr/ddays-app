import { QueryOptions, useQuery } from 'react-query';

import { NotificationDto } from '../types/notification';
import { api } from '.';

const fetchAllNotifications = async () =>
  await api.get<never, NotificationDto[]>('/notification');

export const useFetchNotifications = (
  options?: QueryOptions<NotificationDto[]>,
) => {
  return useQuery(['notification'], fetchAllNotifications, {
    initialData: [],
    ...options,
  });
};
