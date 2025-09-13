import { EventWithRatingDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const eventGetAllWithRating = () => {
  return api.get<never, EventWithRatingDto[]>('/event/all-with-ratings');
};

export const useEventGetAllWithRating = (
  options?: QueryOptions<EventWithRatingDto[]>,
) => {
  return useQuery(
    ['event', 'all-with-ratings'],
    eventGetAllWithRating,
    options,
  );
};
