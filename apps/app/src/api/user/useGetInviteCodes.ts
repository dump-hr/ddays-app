import { QUERY_KEYS } from '@/constants/queryKeys';
import axios from '../base';
import { useQuery } from 'react-query';

const getInviteCodes = async (): Promise<string[]> => {
  return await axios.get('/auth/invite-codes');
};

export const useGetInviteCodes = () => {
  return useQuery<string[]>([QUERY_KEYS.inviteCodes], getInviteCodes);
};
