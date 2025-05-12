import { EventWithSpeakerDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import axios from '../base';

const eventGetAllWithSpeakers = () => {
  return axios.get<never, EventWithSpeakerDto[]>('/event/with-speaker');
};

export const useEventGetAllWithSpeakers = (
  options?: QueryOptions<EventWithSpeakerDto[]>,
) => {
  return useQuery(['event'], eventGetAllWithSpeakers, options);
};
