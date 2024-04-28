import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import classes from './EventsSection.module.scss';

type EventCardProps = {
  title: string;
  isTransparent?: boolean;
  observedTitle: string;
  setObservedTitle: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
};

gsap.registerPlugin(ScrollTrigger);

const EventCard: React.FC<EventCardProps> = ({
  title,
  observedTitle,
  setObservedTitle,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, { once: true });
  const isTitleInView = useInView(titleRef, { once: false });

  useEffect(() => {
    if (isTitleInView) {
      setObservedTitle(title);
    }
    if (!isTitleInView && observedTitle === title) {
      setObservedTitle('');
    }
  }, [isTitleInView, setObservedTitle, title, observedTitle]);

  return (
    <section ref={cardRef} className={classes.scrollEventContainer}>
      <div
        className={classes.eventTitleContainer}
        style={{
          opacity: observedTitle === title && isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0s',
        }}>
        <span className={classes.eventTitle} ref={titleRef}>
          {title}
        </span>
      </div>
      {children}
    </section>
  );
};

export default EventCard;
