import { Duration } from 'date-fns';

export const durationToTimeString = (duration: Duration) =>
  `${duration.years ? duration.years + 'y ' : ''}${
    duration.months ? duration.months + 'm ' : ''
  }${duration.days ? duration.days + 'd ' : ''}${
    duration.hours ? duration.hours + 'h ' : ''
  }${duration.minutes ? duration.minutes + 'm ' : ''}${
    duration.seconds ? duration.seconds + 's ' : ''
  }`;

export const formatDatetime = (iso: string) => {
  const date = new Date(iso);
  return `${date.getDate()}.${
    date.getMonth() + 1
  }. u ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
};
