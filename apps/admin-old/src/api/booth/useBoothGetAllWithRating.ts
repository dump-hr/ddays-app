import { BoothWithRatingDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const boothGetAllWithRating = () => {
  return api.get<never, BoothWithRatingDto[]>('/booth/all-with-ratings');
};

export const useBoothGetAllWithRating = (
  options?: QueryOptions<BoothWithRatingDto[]>,
) => {
  return useQuery(
    ['booth', 'all-with-ratings'],
    boothGetAllWithRating,
    options,
  );
};
