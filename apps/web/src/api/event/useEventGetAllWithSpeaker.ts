import { EventWithSpeakerDto } from '@ddays-app/types';
import { QueryOptions, useQuery } from 'react-query';

import { api } from '..';

const eventGetAllWithSpeaker = () => {
  return api.get<never, EventWithSpeakerDto[]>('/event/with-speaker');
};

export const useEventGetAllWithSpeaker = (
  options?: QueryOptions<EventWithSpeakerDto[]>,
) => {
  return useQuery(['event'], eventGetAllWithSpeaker, options);
};
