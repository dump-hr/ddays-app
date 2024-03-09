import { year } from '../constants/year';

export const getPageTitle = (title?: string) => {
  if (!title) {
    return `DUMP Days ${year}`;
  }
  return `${title} - DUMP Days ${year}`;
};
