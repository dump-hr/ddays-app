import { Theme } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useEventGetAllWithSpeaker } from '../../api/event/useEventGetAllWithSpeaker';
import { useScreenSize } from '../../hooks/useScreenSize';
import ScheduleCard from './ScheduleCard';
import c from './ScheduleSection.module.scss';

const enum ConferenceDay {
  First = '23',
  Second = '24',
}

const getEventDay = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const day = date.getDate();

  return day.toString();
};

const ScheduleSection = () => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [date, setDate] = useState<ConferenceDay>(ConferenceDay.First);
  const { isMobile } = useScreenSize(1000);
  const [openedCardId, setOpenedCardId] = useState<number | null>(null);
  const lastClickedCardId = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile && theme !== null) {
      setTheme(null);
    }
  }, [isMobile, theme]);

  const events = useEventGetAllWithSpeaker();

  if (events.isLoading) {
    return null;
  }

  return (
    <div className={c.ofXHidden} id='raspored'>
      <div className={c.scheduleSectionWrapper}>
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
              <button
                onClick={() => setTheme(null)}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: theme === null,
                })}>
                SVE
              </button>
              <button
                onClick={() => setTheme(Theme.DEV)}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: theme === Theme.DEV,
                })}>
                DEV
              </button>
              <button
                onClick={() => setTheme(Theme.DESIGN)}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: theme === Theme.DESIGN,
                })}>
                DIZAJN
              </button>
              <button
                onClick={() => setTheme(Theme.MARKETING)}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: theme === Theme.MARKETING,
                })}>
                MARKETING
              </button>
              <button
                onClick={() => setTheme(Theme.TECH)}
                className={clsx(c.scheduleButton, {
                  [c.scheduleButtonFocused]: theme === Theme.TECH,
                })}>
                TECH
              </button>
            </div>
          </div>
          <div className={c.scheduleContainer}>
            {events.data
              ?.filter(
                (event) =>
                  (theme === null || event.theme === theme) &&
                  getEventDay(event.startsAt) === date,
              )
              ?.map((event) => (
                <ScheduleCard
                  key={event.id}
                  event={event}
                  openCardId={openedCardId}
                  setOpenCardId={setOpenedCardId}
                  lastClickedCardId={lastClickedCardId}
                />
              ))}
            {events.data?.length === 0 && 'Trenutno nema upisanih događaja'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
