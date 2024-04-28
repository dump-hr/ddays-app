import lesson from 'assets/images/events/lesson.png';
import lessonTwo from 'assets/images/events/lesson-2.png';
import lessonFour from 'assets/images/events/lesson-4.png';
import schedule from 'assets/images/events/schedule.png';
import FilmFrame from 'components/FilmFrame';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import { events } from './data';
import EventCard from './EventCard';
import classes from './EventsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const EventsSection = () => {
  const eventsContainer = useRef<HTMLDivElement>(null);
  const [observedTitle, setObservedTitle] = useState('');

  useEffect(() => {
    gsap.fromTo(
      eventsContainer.current,
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      },
      {
        x: -1150,
        y: 1450,
        scale: 7,
        opacity: 1,
        ease: 'sine.inOut',
        duration: 10,
        scrollTrigger: {
          trigger: eventsContainer.current,
          scrub: true,
          start: 'center center',
          end: '+=700',
        },
      },
    );
  }, []);

  return (
    <div className={classes.eventSectionWrapper}>
      <div className={classes.eventSection}>
        <div className={classes.container} ref={eventsContainer}>
          <div>
            <FilmFrame imageSrc={schedule} width={320} height={400} />
          </div>
          <div>
            <FilmFrame imageSrc={lessonTwo} width={320} height={400} />
          </div>
          <div>
            <FilmFrame imageSrc={lesson} width={320} height={400} />
          </div>
          <div>
            <FilmFrame imageSrc={lessonFour} width={320} height={400} />
          </div>
        </div>

        <div className={classes.scrollEventWrapper}>
          {events.map((event) => (
            <EventCard
              title={event.title}
              observedTitle={observedTitle}
              setObservedTitle={setObservedTitle}>
              <img className={classes.eventImage} src={event.image} alt='' />
            </EventCard>
          ))}
        </div>
      </div>
    </div>
  );
};
