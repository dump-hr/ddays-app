import { EventDto } from '@ddays-app/types';

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

type ScheduleCardProps = {
  event: EventDto;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ event }) => {
  return (
    <div key={event.id} className={c.scheduleCardContainer}>
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
            <div className={c.scheduleCardTitleWrapper}>
              <div className={c.themeBadge}>
                <p className={c.themeBadgeText}>DIZ</p>
              </div>
              <div className={c.scheduleCardTitle}>{event.name}</div>
            </div>
          </div>
        </div>
        <div className={c.scheduleCardRight}>
          <img src={PlusSvg} alt='plus' />
        </div>
      </div>
      <div className={c.dottedRuler}>
        .....................................................................................................................................................................
      </div>
    </div>
  );
};

export default ScheduleCard;
