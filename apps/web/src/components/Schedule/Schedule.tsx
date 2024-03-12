import { useEventGetAll } from '../../api/event/useEventGetAll';
import EllipseSvg from '../../assets/Ellipse.svg';
import c from './Schedule.module.scss';

const getEventTime = (dateTimeString: string) => {
  const timeString = dateTimeString.split(' ')[1];
  return timeString;
};

const Schedule = () => {
  const events = useEventGetAll();

  if (events.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={c.scheduleSectionWrapper}>
      <div className={c.scheduleSectionBackground}>
        {/* <img className={c.scheduleSectionBackgroundImage} src={NoiseSvg} /> */}
      </div>
      <div className={c.scheduleSection}>
        <div className={c.scheduleHeader}>
          <div className={c.scheduleHeaderLeft}>
            <button>PETAK, 25.05</button>
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
            <div key={event.id} className={c.scheduleCard}>
              <div className={c.scheduleCardLeft}>
                <p>
                  {getEventTime(event.startsAt)} - {getEventTime(event.endsAt)}
                </p>
                <p>{event.type}</p>
              </div>
              <div className={c.scheduleCardCenter}>
                <div className={c.scheduleCardTitleWrapper}>
                  <div className={c.themeBadge}>
                    <img
                      className={c.themeBadgeImage}
                      src={EllipseSvg}
                      alt='ellipse'
                    />
                    <p className={c.themeBadgeText}>DIZ</p>
                  </div>
                  <div className={c.scheduleCardTitle}>{event.name}</div>
                </div>
              </div>
              <div className={c.scheduleCardRight}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
