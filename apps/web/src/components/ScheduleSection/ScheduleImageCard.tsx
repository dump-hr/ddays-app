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
  src: string | undefined;
  event: EventWithSpeakerDto;
  isOpenDescription: boolean;
  isImageShown: boolean;
};

const ScheduleImageCard: React.FC<ScheduleImageCardProps> = ({
  src,
  event,
  isOpenDescription,
  isImageShown,
}) => {
  const speakerPhoto = useRef<HTMLDivElement>(null);
  const cardAspectRatio = 401 / 320;
  const { isMobile } = useScreenSize(930);

  const getImageSrc = (src?: string): string => {
    if (event.type === 'campfireTalk') return CampfireTalks;
    if (event.name === 'Ručak') return LunchImage;
    if (!src) return '';

    return src;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (speakerPhoto && !isOpenDescription) {
        gsap.fromTo(
          speakerPhoto.current,
          { scale: 0 },
          { scale: 1, duration: 0.7, ease: 'power2.out' },
        );
      }
    });
    return () => ctx.revert();
  }, [isMobile, isImageShown, isOpenDescription]);

  return (
    <div className={c.speakerPhoto} ref={speakerPhoto}>
      <img src={getImageSrc(src)} height={cardAspectRatio * 120} width={120} />
    </div>
  );
};

export default ScheduleImageCard;
