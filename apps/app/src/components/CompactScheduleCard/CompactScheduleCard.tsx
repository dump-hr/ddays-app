import React, { useEffect, useState } from 'react';
import c from './CompactScheduleCard.module.scss';
import { getThemeLabel } from '../../helpers/getThemeLabel';
import { getTypeLabel } from '../../helpers/getTypeLabel';
import { getTimeFromDate } from '../../helpers/getTimeFromDate';

type EventType =
  | 'lecture'
  | 'workshop'
  | 'flyTalk'
  | 'campfireTalk'
  | 'panel'
  | 'other';
type EventTheme = 'dev' | 'design' | 'marketing' | 'tech';

type Speaker = {
  firstName: string;
  lastName: string;
  title: string;
  logoImage: string;
  thumbnailUrl: string;
};

export type EventProps = {
  name: string;
  description?: string;
  type: EventType;
  theme: EventTheme;
  startsAt: string;
  endsAt: string;
  requirements?: string[];
  speakers: Speaker[];
  moderator?: Speaker;
};

type CompactScheduleCardProps = {
  event: EventProps;
};

const CompactScheduleCard: React.FC<CompactScheduleCardProps> = ({ event }) => {
  const [isLive, setIsLive] = useState(false);

  function getTimeFrameFromDate(start: string, end: string) {
    return `${getTimeFromDate(start)} - ${getTimeFromDate(end)}`;
  }

  function getRemainingTimeInMinutes(end: string) {
    const now = new Date().getMilliseconds();
    const endMs = new Date(end).getMilliseconds();

    return Math.floor((endMs - now) / 60000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getMilliseconds();
      const start = new Date(event.startsAt).getMilliseconds();
      const end = new Date(event.startsAt).getMilliseconds();

      if (now >= start && now <= end) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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
        <div className={c.live}>
          <div className={c.icon}>
            <div className={c.innerCircle} />
          </div>
          <p className={c.liveText}>LIVE</p>
        </div>
      </div>
      {isLive && (
        <div className={c.liveTime}>
          <p className={c.timeframe}>
            {getTimeFrameFromDate(event.startsAt, event.endsAt)}
          </p>
          <div className={c.progressBarWrapper}>
            <div className={c.progressBar}>
              <div className={c.completedRatio} />
            </div>
            <p className={c.remainingTime}>
              JOŠ {getRemainingTimeInMinutes(event.endsAt)} MIN
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactScheduleCard;
