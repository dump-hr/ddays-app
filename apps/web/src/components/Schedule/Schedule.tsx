import { Theme } from '@ddays-app/types';
import clsx from 'clsx';
import { useState } from 'react';

import { useEventGetAll } from '../../api/event/useEventGetAll';
import GrainyBackground from '../GrainyBackground';
import c from './Schedule.module.scss';
import ScheduleCard from './ScheduleCard';

const enum ConferenceDay {
  First = '23',
  Second = '24',
}

const Schedule = () => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [date, setDate] = useState<ConferenceDay>(ConferenceDay.First);

  const events = useEventGetAll();

  if (events.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <GrainyBackground>
      <div className={c.scheduleSectionWrapper}>
        <div className={c.scheduleSectionBackground}></div>
        <div className={c.scheduleSection}>
          <div className={c.scheduleHeader}>
            <div className={c.scheduleHeaderLeft}>
              <button
                onClick={() => {
                  setDate(ConferenceDay.First);
                }}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: date === ConferenceDay.First,
                })}>
                ČETVRTAK, 23.05
              </button>
              <button
                onClick={() => setDate(ConferenceDay.Second)}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: date === ConferenceDay.Second,
                })}>
                PETAK, 24.05
              </button>
            </div>
            <div className={c.scheduleHeaderRight}>
              <button className={c.scheduleButton}>SVE</button>
              <button className={c.scheduleButton}>DEV</button>
              <button className={c.scheduleButton}>DIZAJN</button>
              <button className={c.scheduleButton}>MARKETING</button>
              <button className={c.scheduleButton}>TECH</button>
            </div>
          </div>
          <div className={c.scheduleContainer}>
            {events.data?.map((event) => (
              <ScheduleCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </GrainyBackground>
  );
};

export default Schedule;
