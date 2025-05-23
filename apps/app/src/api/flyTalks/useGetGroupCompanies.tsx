import axios from '../base';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { EventWithCompanyDto } from '@ddays-app/types';

const getAllFlyTalkGroups = async (): Promise<EventWithCompanyDto[]> => {
  return axios.get('/event/fly-talks-with-company');
};

export const useGetAllFlyTalkGroups = () => {
  return useQuery<EventWithCompanyDto[]>(
    [QUERY_KEYS.flyTalkGroups],
    getAllFlyTalkGroups,
  );
};
