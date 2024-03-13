import { useEventGetAll } from '../../api/event/useEventGetAll';
import GrainyBackground from '../GrainyBackground';
import c from './Schedule.module.scss';
import ScheduleCard from './ScheduleCard';

const Schedule = () => {
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
            {events.data?.map((event) => <ScheduleCard event={event} />)}
          </div>
        </div>
      </div>
    </GrainyBackground>
  );
};

export default Schedule;
