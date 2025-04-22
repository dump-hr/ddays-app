import { useQuery } from 'react-query';

import axios from '../base';

const eventGetIcalSchedule = async (): Promise<string> => {
  return axios.get<never, string>('/event/schedule-ical');
};

export const useEventGetIcalSchedule = () => {
  return useQuery([], eventGetIcalSchedule);
};
