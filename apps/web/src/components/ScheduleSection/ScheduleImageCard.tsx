import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventWithSpeakerDto } from '@ddays-app/types';
import LunchImage from 'assets/images/events/schedule/pizza-lunch.png';
import CampfireTalks from 'assets/images/events/schedule/campfire-talks.png';
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
};

const ScheduleImageCard: React.FC<ScheduleImageCardProps> = ({
  index,
  src,
  event,
  isOpenDescription,
  isImageShown,
  imagesLength = 1,
}) => {
  const speakerPhoto = useRef<HTMLDivElement>(null);
  const isSpeakerPhoto = useRef(true);
  const cardAspectRatio = useRef(401 / 320);
  const { isMobile } = useScreenSize(1030);

  const getImageSrcAndSetType = (src?: string): string => {
    isSpeakerPhoto.current = false;
    cardAspectRatio.current = 1;

    if (event.type === 'campfireTalk') return CampfireTalks;
    if (event.name === 'Ručak') return LunchImage;
    if(!src) return '';

    isSpeakerPhoto.current = true;
    cardAspectRatio.current = 401 / 320;
    return src;
  };
  
  const image = getImageSrcAndSetType(src)

  useEffect(() => {
    if (isMobile || !speakerPhoto) return;

    const ctx = gsap.context(() => {
      const translateX =
        isSpeakerPhoto.current && imagesLength > 1 ? 90 * index : 70;
      const translateY = index !== 2 ? 6 * index : 20;
      const rotateDeg = index !== 0 ? 6 * index : -3;

      if (!isOpenDescription) {
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
    });
    return () => ctx.revert();
  }, [isMobile, isImageShown, isOpenDescription]);

  return (
    <div className={c.speakerPhoto} ref={speakerPhoto}>
      {image && (
        <img
          src={image}
          height={cardAspectRatio.current * 120}
          width={120}
        />
      )}
    </div>
  );
};

export default ScheduleImageCard;
