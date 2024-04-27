import { useInView } from 'framer-motion';
import { useRef } from 'react';

import classes from './EventsSection.module.scss';

type EventCardProps = {
  title: string;
  children: React.ReactNode;
};

const EventCard: React.FC<EventCardProps> = ({ title, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className={classes.scrollEventContainer}>
      <div
        className={classes.eventTitleContainer}
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        }}>
        <span className={classes.eventTitle}>{title}</span>
      </div>
      {children}
    </section>
  );
};

export default EventCard;
