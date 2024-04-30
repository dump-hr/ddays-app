import lesson from 'assets/images/events/lesson.webp';
import lessonOne from 'assets/images/events/lesson-1.webp';
import lessonTwo from 'assets/images/events/lesson-2.webp';
import lessonFour from 'assets/images/events/lesson-4.webp';
import FilmFrame from 'components/FilmFrame';
import { SectionBreaker } from 'components/SectionBreaker';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import { useScreenSize } from '../../hooks/useScreenSize';
import { events } from './data';
import EventCard from './EventCard';
import classes from './EventsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const EventsSection = () => {
  const eventsContainer = useRef<HTMLDivElement>(null);
  const [observedTitle, setObservedTitle] = useState('');

  const { isMobile, isSmallScreen } = useScreenSize(748, 1024);

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
        x: isMobile ? 500 : isSmallScreen ? 1000 : -1150,
        y: isMobile ? 50 : isSmallScreen ? -100 : 1450,
        scale: isMobile || isSmallScreen ? 6 : 7,
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
  }, [isMobile, isSmallScreen]);

  return (
    <div className={classes.eventSectionWrapper}>
      <div className={classes.eventSection}>
        <div className={classes.container} ref={eventsContainer}>
          <div>
            <FilmFrame
              imageSrc={lessonOne}
              width={isMobile ? 163 : 320}
              height={isMobile ? 205 : 400}
            />
          </div>
          <div>
            <FilmFrame
              imageSrc={lessonTwo}
              width={isMobile ? 163 : 320}
              height={isMobile ? 205 : 400}
            />
          </div>
          <div>
            <FilmFrame
              imageSrc={lesson}
              width={isMobile ? 163 : 320}
              height={isMobile ? 205 : 400}
            />
          </div>
          <div>
            <FilmFrame
              imageSrc={lessonFour}
              width={isMobile ? 163 : 320}
              height={isMobile ? 205 : 400}
            />
          </div>
        </div>

        <div className={classes.scrollEventWrapper}>
          {events.map((event, i) => (
            <EventCard
              title={event.title}
              observedTitle={observedTitle}
              setObservedTitle={setObservedTitle}>
              {i === 0 ? (
                <div className={classes.eventImage} />
              ) : (
                <img className={classes.eventImage} src={event.image} alt='' />
              )}
            </EventCard>
          ))}
        </div>
      </div>
      <div className={classes.eventsBreaker}>
        <SectionBreaker fg='light' />
        <div className={classes.breakerPadding} />
      </div>
    </div>
  );
};
