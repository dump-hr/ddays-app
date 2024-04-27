import ReactLenis from '@studio-freight/react-lenis/types';
import booth from 'assets/images/events/booth.png';
import campfire from 'assets/images/events/campfire-talk.png';
import eventOne from 'assets/images/events/first.png';
import flytalk from 'assets/images/events/flytalk.png';
import eventFour from 'assets/images/events/fourth.png';
import lesson from 'assets/images/events/lesson.png';
import panelTalk from 'assets/images/events/panel-talk.png';
import schedule from 'assets/images/events/schedule.png';
import eventTwo from 'assets/images/events/second.png';
import eventThree from 'assets/images/events/third.png';
import workshop from 'assets/images/events/workshop.png';
import FilmFrame from 'components/FilmFrame';
import gsap from 'gsap';
import { RefObject, useEffect, useRef } from 'react';

import EventCard from './EventCard';
import classes from './EventsSection.module.scss';

const calculateTransform = (el: RefObject<HTMLElement>) => {
  if (!el.current) {
    return { translateX: 0, translateY: 0, maxScale: 1 };
  }

  const { x, y, width, height } = el.current.getBoundingClientRect();
  console.log(x, y, width, height);

  const maxTranslateX = window.innerWidth / 2 - x - width / 2;
  const maxTranslateY = window.innerHeight / 2 - y - height / 2;

  const widthRatio = window.innerWidth / width;
  const heightRatio = window.innerHeight / height;
  const maxScale = Math.max(widthRatio, heightRatio);

  return { maxTranslateX, maxTranslateY, maxScale };
};

export const EventsSection = () => {
  const zoomElement = useRef<HTMLDivElement>(null);
  const scrollElement = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={classes.container}>
        <div>
          <FilmFrame imageSrc={eventOne} width={320} height={400} />
        </div>
        <div>
          <FilmFrame imageSrc={eventTwo} width={320} height={400} />
        </div>
        <div className={classes.zoomElement} ref={zoomElement}>
          <FilmFrame imageSrc={eventThree} width={320} height={400} />
        </div>
        <div>
          <FilmFrame imageSrc={eventFour} width={320} height={400} />
        </div>
      </div>

      <div className={classes.scrollEventWrapper}>
        <EventCard title='predavanja (16)'>
          <img className={classes.eventImage} src={lesson} alt='lessons' />
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
    </>
  );
};
