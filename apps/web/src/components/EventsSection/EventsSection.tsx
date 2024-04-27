import eventOne from 'assets/images/events/first.png';
import eventFour from 'assets/images/events/fourth.png';
import eventTwo from 'assets/images/events/second.png';
import eventThree from 'assets/images/events/third.png';
import FilmFrame from 'components/FilmFrame';
import { RefObject, useEffect, useRef } from 'react';

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

  useEffect(() => {
    // const zoomElement = document.querySelector('.zoomElement');
    console.log(zoomElement);
    if (!zoomElement) {
      return;
    }

    const handleScroll = (e) => {
      zoomElement.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [initialX, initialY, maxScale, maxTranslateX, maxTranslateY]);

  return (
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

      <div className={classes.scrollElement} ref={scrollElement}></div>
    </div>
  );
};
