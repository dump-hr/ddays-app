import { EventDto } from '@ddays-app/types';
import { useState } from 'react';

import PlusSvg from '../../assets/Plus.svg';
import c from './Schedule.module.scss';

const getEventTime = (dateTimeString: string) => {
  //when you send default value for date time (in admin)
  //the string has space, otherwise T
  if (dateTimeString.includes('T')) {
    return dateTimeString.split('T')[1];
  }
  return dateTimeString.split(' ')[1];
};

const getEventTypeTranslation = (type: string) => {
  switch (type) {
    case 'lecture':
      return 'PREDAVANJE';
    case 'workshop':
      return 'RADIONICA';
    case 'flyTalk':
      return 'FLY TALK';
    case 'campfireTalk':
      return 'CAMPFIRE TALK';
    case 'other':
      return 'OSTALO';
  }
};

const getThemeShort = (theme: string) => {
  switch (theme) {
    case 'dev':
      return 'DEV';
    case 'design':
      return 'DIZ';
    case 'marketing':
      return 'MARK';
    case 'tech':
      return 'TECH';
  }
};

type ScheduleCardProps = {
  fitsTheme: boolean;
  fitsDate: boolean;
  event: EventDto;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  fitsTheme,
  fitsDate,
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const toggleOpenDescription = () => {
    setIsOpenDescription((prev) => !prev);
  };

  if (!fitsTheme) {
    return null;
  }

  if (!fitsDate) {
    return null;
  }

  return (
    <div className={c.scheduleCardContainer}>
      <div className={c.scheduleCard}>
        <div className={c.scheduleCardLeftWrapper}>
          <div className={c.scheduleCardLeft}>
            <p className={c.timeText}>
              {getEventTime(event.startsAt)} - {getEventTime(event.endsAt)}
            </p>
            <p className={c.eventTypeText}>
              {getEventTypeTranslation(event.type)}
            </p>
          </div>
          <div className={c.scheduleCardCenter}>
            <div className={c.themeBadge}>
              <p className={c.themeBadgeText}>{getThemeShort(event.theme)}</p>
            </div>
            <div className={c.scheduleCardTitleWrapper}>
              <h3 className={c.scheduleCardTitle}>{event.name}</h3>
              <h4 className={c.scheduleCardSubtitle}>MATE RIMAC / @RIMAC</h4>
            </div>
            {isOpenDescription && (
              <div className={c.scheduleCardDescription}>
                {event.description}
              </div>
            )}
          </div>
        </div>
        <div className={c.scheduleCardRight}>
          <button onClick={toggleOpenDescription} className={c.plusButton}>
            <img src={PlusSvg} alt='plus' />
          </button>
        </div>
      </div>
      <div className={c.dottedRuler}>
        .....................................................................................................................................................................
      </div>
    </div>
  );
};

export default ScheduleCard;
