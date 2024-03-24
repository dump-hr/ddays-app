import { EventDto } from '@ddays-app/types';
import { useState } from 'react';

import PlusSvg from '../../assets/Plus.svg';
import c from './Schedule.module.scss';

const getEventTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  const minutes = date.getMinutes();
  const hours = date.getHours();

  const hoursString = hours.toString();
  let minutesString = minutes.toString();

  if (minutes < 10) {
    minutesString = '0' + minutes.toString();
  }

  return hoursString + ':' + minutesString;
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
  event: EventDto;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ event }) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const toggleOpenDescription = () => {
    setIsOpenDescription((prev) => !prev);
  };

  const handleCardClick = () => {
    if (window.innerWidth < 800) {
      toggleOpenDescription();
    }
  };

  return (
    <div onClick={handleCardClick} className={c.scheduleCardContainer}>
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
              {isOpenDescription && (
                <div className={c.scheduleCardDescription}>
                  {event.description}
                </div>
              )}
            </div>
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
