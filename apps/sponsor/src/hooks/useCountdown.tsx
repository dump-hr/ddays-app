import { differenceInMilliseconds, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

import { durationToTimeString } from '../helpers/date';

const useCountdown = (compareToToday: string | undefined) => {
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  const [didFinish, setDidFinish] = useState(false);

  useEffect(() => {
    if (!compareToToday || compareToToday === 'Invalid Date') return;

    setDidFinish(
      0 >= differenceInMilliseconds(new Date(compareToToday), new Date()),
    );

    const timer = setInterval(() => {
      const duration = intervalToDuration({
        start: 0,
        end: differenceInMilliseconds(new Date(compareToToday), new Date()),
      });

      setElapsedTime(durationToTimeString(duration));
      setDidFinish(
        0 >= differenceInMilliseconds(new Date(compareToToday), new Date()),
      );

      return () => {
        clearInterval(timer);
      };
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [compareToToday]);

  return { elapsedTime, didFinish };
};

export default useCountdown;
