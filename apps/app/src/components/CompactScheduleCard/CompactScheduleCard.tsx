import React, { useEffect, useState } from 'react';
import c from './CompactScheduleCard.module.scss';

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
          <div className={c.theme}></div>
          <p className={c.type}></p>
        </div>
      )}
      <div className={c.headerRow}>
        <div className={c.category}></div>
        <div className={c.live}></div>
      </div>
      {isLive && (
        <div className={c.liveTime}>
          <p className={c.timeframe}></p>
          <div className={c.progressBarWrapper}>
            <div className={c.progressBar}>
              <div className={c.completedRatio}></div>
            </div>
            <p className={c.remainingTime}></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactScheduleCard;
