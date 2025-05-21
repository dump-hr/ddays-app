import { RatingDto } from '@ddays-app/types';
import { useQuery } from 'react-query';

import axios from '../base';

const getUserRatings = async (): Promise<RatingDto[]> => {
  return axios.get<never, RatingDto[]>('/rating/my-ratings');
};

export const useGetUserRatings = () => {
  return useQuery(['userRatings'], getUserRatings);
};
