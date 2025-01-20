import React, { useEffect, useState, forwardRef } from 'react';
import c from './CompactScheduleCard.module.scss';
import { getThemeLabel } from '../../helpers/getThemeLabel';
import { getTypeLabel } from '../../helpers/getTypeLabel';
import { getTimeFromDate } from '../../helpers/getTimeFromDate';
import clsx from 'clsx';

import { EventWithSpeakerDto } from '@ddays-app/types';

type CompactScheduleCardProps = {
  event: EventWithSpeakerDto;
  id: string | undefined;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

const CompactScheduleCard = forwardRef<
  HTMLDivElement,
  CompactScheduleCardProps
>(({ event, id, className }, ref) => {
  const [isLive, setIsLive] = useState(() => {
    const now = new Date().getTime();
    const start = new Date(event.startsAt).getTime();
    const end = new Date(event.endsAt).getTime();

    return now >= start && now <= end;
  });

  const [remainingTime, setRemainingTime] = useState(
    getRemainingTimeInMinutes(event.endsAt),
  );

  const duration =
    new Date(event.endsAt).getTime() - new Date(event.startsAt).getTime();

  function getTimeFrameFromDate(start: string, end: string) {
    return `${getTimeFromDate(start)} - ${getTimeFromDate(end)}`;
  }

  function getRemainingTimeInMinutes(end: string) {
    const now = new Date().getTime();
    const endMs = new Date(end).getTime();

    const remainingMs = endMs - now;
    return Math.max(0, Math.floor(remainingMs / 60000));
  }

  useEffect(() => {
    const startMs = new Date(event.startsAt).getTime();
    const endMs = new Date(event.endsAt).getTime();

    const updateStatus = () => {
      const now = new Date().getTime();
      setIsLive(now >= startMs && now <= endMs);
      setRemainingTime(Math.max(0, Math.floor((endMs - now) / 60000)));
    };

    updateStatus();

    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [event.startsAt, event.endsAt]);

  return (
    <div id={id} ref={ref} className={clsx(c.compactScheduleCard, className)}>
      {!isLive && (
        <div className={c.notLiveTime}>
          <p className={c.timeframe}>
            {getTimeFrameFromDate(event.startsAt, event.endsAt)}
          </p>
          <div className={c.divider}></div>
        </div>
      )}
      <div className={c.headerRow}>
        <div className={c.infoWrapper}>
          <div className={c.tag}>
            <p className={c.theme}>{getThemeLabel(event.theme)}</p>
          </div>
          <p className={c.type}>{getTypeLabel(event.type)}</p>
        </div>
        {isLive && (
          <div className={c.live}>
            <div className={c.icon}>
              <div className={c.innerCircle} />
            </div>
            <p className={c.liveText}>UŽIVO</p>
          </div>
        )}
      </div>
      <div className={c.nameSpeakers}>
        <h3 className={c.name}>{event.name}</h3>
        <p className={c.speakers}>
          {event.speakers?.map(
            (speaker) =>
              `${speaker.firstName} ${speaker.lastName} // ${speaker.title} @ ${speaker.company?.name}`,
          )}
        </p>
      </div>
      {isLive && (
        <div className={c.liveTime}>
          <div className={c.divider} />
          <p className={c.timeframe}>
            {getTimeFrameFromDate(event.startsAt, event.endsAt)}
          </p>
          <div className={c.progressBarWrapper}>
            <div className={c.progressBar}>
              <div
                className={c.completedRatio}
                style={{
                  width: `${(1 - remainingTime / (duration / 60000)) * 100}%`,
                }}
              />
            </div>
            <p className={c.remainingTime}>JOŠ {remainingTime} MIN</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default CompactScheduleCard;
