import { EventType, EventWithSpeakerDto } from '@ddays-app/types';
import CampfireTalks from 'assets/images/events/schedule/campfire-talks.png';
import LunchImage from 'assets/images/events/schedule/pizza-lunch.png';
import stampBackground from 'assets/images/samp-background-schedule-section.png';
import microphoneImg from 'assets/images/microphone.png';
import laptopImg from 'assets/images/laptop.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { useScreenSize } from '../../hooks/useScreenSize';
import c from './ScheduleSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

type ScheduleImageCardProps = {
  index: number;
  src: string | undefined;
  event: EventWithSpeakerDto;
  isOpenDescription: boolean;
  isImageShown: boolean;
  imagesLength?: number;
  lastClickedCardId: React.MutableRefObject<number | null>;
};

const ScheduleImageCard: React.FC<ScheduleImageCardProps> = ({
  index,
  src,
  event,
  isOpenDescription,
  isImageShown,
  imagesLength = 1,
  lastClickedCardId,
}) => {
  const speakerPhoto = useRef<HTMLDivElement>(null);
  const { isMobile } = useScreenSize(1030);

  const getImageSrc = (src?: string): string => {
    if (event.type === EventType.CAMPFIRE_TALK) return CampfireTalks;
    if (event.name === 'Ručak') return LunchImage;
    if (!src) return '';
    return src;
  };

  const image = getImageSrc(src);

  const isSpeakerPhoto =
    event.type !== EventType.CAMPFIRE_TALK &&
    event.name !== 'Ručak' &&
    !!src;

  const animateCards = (
    translateY: number,
    translateX: number,
    rotateDeg: number,
  ) => {
    if (
      (lastClickedCardId.current !== event.id && !isOpenDescription) ||
      (lastClickedCardId.current === -1 && !isOpenDescription)
    ) {
      gsap.fromTo(
        speakerPhoto.current,
        { scale: 0, x: 0, y: 0, rotation: -3 },
        {
          scale: 1,
          x: translateX,
          y: translateY,
          rotation: rotateDeg,
          duration: 0.7,
          ease: 'power2.out',
        },
      );
    } else {
      const transform = `scale(1) translate(${translateX}px, ${translateY}px) rotate(${rotateDeg}deg)`;
      speakerPhoto.current!.style.transform = transform;
    }
  };

  useEffect(() => {
    if (isMobile || !speakerPhoto) return;

    const translateY = index !== 2 ? 6 * index : 20;
    const rotateDeg = index !== 0 ? 6 * index : -3;
    let translateX = 70;

    if (isSpeakerPhoto && imagesLength > 1) translateX = 90 * index;
    if (isSpeakerPhoto && imagesLength === 3) translateX -= 80;

    const ctx = gsap.context(() =>
      animateCards(translateY, translateX, rotateDeg),
    );

    return () => ctx.revert();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isMobile,
    isImageShown,
    isOpenDescription,
    lastClickedCardId,
    index,
    imagesLength,
  ]);

  return (
    <div className={c.speakerPhoto} ref={speakerPhoto}>
      {image && (
        isSpeakerPhoto ? (
          <div className={c.stampWrapper}>
            <div className={c.stampCard}>
              <img src={stampBackground} className={c.stampBackground} alt="" />
              <img src={image} className={c.stampImage} alt="" />
            </div>
            <img src={event.type === EventType.WORKSHOP ? laptopImg : microphoneImg} className={c.stampMicrophone} alt="" />
          </div>
        ) : (
          <img src={image} width={120} alt="" />
        )
      )}
    </div>
  );
};

export default ScheduleImageCard;
