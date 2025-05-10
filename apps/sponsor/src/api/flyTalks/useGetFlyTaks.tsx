import { useQuery } from 'react-query';

import { api } from '..';

export const getFlyTalks = async () => {
  return await api.get<never, string[]>('/company/flytalks');
};

export const useGetFlyTalks = () => {
  return useQuery(['flytalks'], getFlyTalks);
};
