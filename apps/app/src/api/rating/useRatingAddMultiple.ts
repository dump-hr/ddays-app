import { useMutation } from 'react-query';

import { RatingModifyDto } from '@ddays-app/types/src/dto/rating';
import axios from '../base';
import { RatingDto } from '@ddays-app/types';

const ratingAddMultiple = async (dtos: RatingModifyDto[]) => {
  return axios.post<RatingModifyDto[], RatingDto[]>('/rating', dtos);
};

export const useRatingAddMultiple = () => {
  return useMutation(ratingAddMultiple);
};
