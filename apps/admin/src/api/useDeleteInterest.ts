import { Interest } from '@ddays-app/types';

import { api } from '.';

export const deletedInterest = async (row: object) => {
  const interest = row as Interest;
  await api.delete<never, Interest>('/interests/' + interest.id);
};

//cant do mutations until I fix the table bug
