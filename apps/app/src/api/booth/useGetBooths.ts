import { BoothDto } from '@ddays-app/types';
import { useQuery } from 'react-query';
import axios from 'axios';

const getBooths = async () => {
  return await axios.get<never, BoothDto[]>('/booth');
};

export const useGetBooths = () => {
  return useQuery(['booth'], getBooths);
};
