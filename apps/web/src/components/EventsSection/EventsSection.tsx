import lesson from 'assets/images/events/card/lesson.webp';
import lessonOne from 'assets/images/events/card/lesson-1.webp';
import lessonTwo from 'assets/images/events/card/lesson-2.webp';
import lessonFour from 'assets/images/events/card/lesson-4.webp';
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

  const { isMobile, isSmallScreen, screenWidth } = useScreenSize(748, 1024);

  const is4K = screenWidth > 2559;
  const isVerySmallMobile = screenWidth < 374;

  let xOffset = 0;
  if (isVerySmallMobile) {
    xOffset = 0;
  } else if (isMobile) {
    xOffset = 500;
  } else if (isSmallScreen) {
    xOffset = 1000;
  } else if (screenWidth < 1500) {
    xOffset = -1400;
  } else if (screenWidth > 1500 || is4K) {
    xOffset = -1700;
  }

  let yOffset = 0;
  if (isVerySmallMobile) {
    yOffset = 250;
  } else if (isMobile) {
    yOffset = 50;
  } else if (isSmallScreen) {
    yOffset = -100;
  } else if (!is4K) {
    yOffset = 1450;
  } else {
    yOffset = 2000;
  }

  let scale = 1;
  if (isMobile || isSmallScreen) {
    scale = 6;
  } else if (screenWidth < 1500) {
    scale = 7;
  } else if (screenWidth > 1500 || is4K) {
    scale = 11;
  }

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
        x: xOffset,
        y: yOffset,
        scale: scale,
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
  }, [isMobile, isSmallScreen, scale, screenWidth, xOffset, yOffset]);

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
              setObservedTitle={setObservedTitle}
              key={event.title}>
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
