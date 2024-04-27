import booth from 'assets/images/events/booth.png';
import campfire from 'assets/images/events/campfire-talk.png';
import flytalk from 'assets/images/events/flytalk.png';
import lesson from 'assets/images/events/lesson.png';
import lessonTwo from 'assets/images/events/lesson-2.png';
import lessonFour from 'assets/images/events/lesson-4.png';
import panelTalk from 'assets/images/events/panel-talk.png';
import schedule from 'assets/images/events/schedule.png';
import workshop from 'assets/images/events/workshop.png';
import FilmFrame from 'components/FilmFrame';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import EventCard from './EventCard';
import classes from './EventsSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export const EventsSection = () => {
  const eventsContainer = useRef<HTMLDivElement>(null);
  const highlightedElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = eventsContainer.current;
    gsap.fromTo(
      el,
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      },
      {
        x: -1150,
        y: 1400,
        scale: 7,
        opacity: 1,
        ease: 'sine.inOut',
        // ease: 'linear',
        duration: 10,
        scrollTrigger: {
          trigger: el,
          scrub: true,
          start: 'center center',
          end: '+=700',
          //   pin: true,
          //   snap: 0.5,
        },
      },
    );
  }, []);

  return (
    <div className={classes.eventSection}>
      <div className={classes.container} ref={eventsContainer}>
        <div>
          <FilmFrame imageSrc={schedule} width={320} height={400} />
        </div>
        <div>
          <FilmFrame imageSrc={lessonTwo} width={320} height={400} />
        </div>
        <div ref={highlightedElement}>
          <FilmFrame imageSrc={lesson} width={320} height={400} />
        </div>
        <div>
          <FilmFrame imageSrc={lessonFour} width={320} height={400} />
        </div>
      </div>

      <div className={classes.scrollEventWrapper}>
        <EventCard title='predavanja (16)'>
          <img className={classes.eventImage} src={''} alt='' />
        </EventCard>
        <EventCard title='radionice (8)'>
          <img className={classes.eventImage} src={workshop} alt='lessons' />
        </EventCard>
        <EventCard title='panel rasprave (2)'>
          <img className={classes.eventImage} src={panelTalk} alt='lessons' />
        </EventCard>
        <EventCard title='campfire talks (4)'>
          <img className={classes.eventImage} src={campfire} alt='lessons' />
        </EventCard>
        <EventCard title='flytalks (300)'>
          <img className={classes.eventImage} src={flytalk} alt='lessons' />
        </EventCard>
        <EventCard title='štandovi (32)'>
          <img className={classes.eventImage} src={booth} alt='lessons' />
        </EventCard>
        <EventCard title='raspored'>
          <img className={classes.eventImage} src={schedule} alt='lessons' />
        </EventCard>
      </div>
    </div>
  );
};
