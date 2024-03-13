import { useEventGetAll } from '../../api/event/useEventGetAll';
import PlusSvg from '../../assets/Plus.svg';
import GrainyBackground from '../GrainyBackground';
import c from './Schedule.module.scss';

const getEventTime = (dateTimeString: string) => {
  const timeString = dateTimeString.split('T')[1];
  return timeString;
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

const Schedule = () => {
  const events = useEventGetAll();

  if (events.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <GrainyBackground>
      <div className={c.scheduleSectionWrapper}>
        <div className={c.scheduleSectionBackground}>
          {/* <img className={c.scheduleSectionBackgroundImage} src={NoiseSvg} /> */}
        </div>
        <div className={c.scheduleSection}>
          <div className={c.scheduleHeader}>
            <div className={c.scheduleHeaderLeft}>
              <button onClick={() => console.log('click')}>PETAK, 25.05</button>
              <button>SUBOTA, 26.05</button>
            </div>
            <div className={c.scheduleHeaderRight}>
              <button>SVE</button>
              <button>DEV</button>
              <button>DIZAJN</button>
              <button>MARKETING</button>
              <button>TECH</button>
            </div>
          </div>
          <div className={c.scheduleContainer}>
            {events.data?.map((event) => (
              <div className={c.scheduleCardContainer}>
                <div key={event.id} className={c.scheduleCard}>
                  <div className={c.scheduleCardLeft}>
                    <p className={c.timeText}>
                      {getEventTime(event.startsAt)} -{' '}
                      {getEventTime(event.endsAt)}
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
                  <div className={c.scheduleCardRight}>
                    <img src={PlusSvg} alt='plus' />
                  </div>
                </div>
                <div className={c.dottedRuler}>
                  ..............................................................................................................................................................................
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GrainyBackground>
  );
};

export default Schedule;
