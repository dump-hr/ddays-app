import { EventWithSpeakerDto } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import PlusSvg from 'assets/icons/plus-black.svg';

import { useScreenSize } from '../../hooks/useScreenSize';
import c from './ScheduleSection.module.scss';
import {
  getEventTime,
  getEventTypeTranslation,
  getSpeakerCompanyStringForEvent,
} from './utils';
import ScheduleImageCard from './ScheduleImageCard';

const getThemeShort = (theme: string) => {
  switch (theme) {
    case 'dev':
      return 'DEV';
    case 'design':
      return 'DIZ';
    case 'marketing':
      return 'MARK';
    case 'tech':
      return 'TECH';
  }
};

type ScheduleCardProps = {
  event: EventWithSpeakerDto;
  openCardId: number | null;
  setOpenCardId: (id: number | null) => void;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  openCardId,
  setOpenCardId,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const images = event.speakers
    ?.filter((speaker) => speaker.photo !== null)
    .map((speaker) => speaker.photo) || [''];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % images.length;
        if (next === 0) return 1;
        return next;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const { isMobile } = useScreenSize(930);

  const isOpenDescription = openCardId === event.id;
  const [isImageShown, setIsImageShown] = useState(false);

  const handleCardClick = () => {
    if (isOpenDescription) {
      setOpenCardId(null);
    } else {
      setOpenCardId(event.id);
    }
  };

  const handleHover = () => {
    if (!isOpenDescription) setIsImageShown(true);
  };

  const handleUnhover = () => {
    setIsImageShown(false);
  };

  return (
    <div
      onMouseOver={handleHover}
      onMouseLeave={handleUnhover}
      onClick={handleCardClick}
      className={c.scheduleCardContainer}>
      <div className={c.scheduleCard}>
        {(isImageShown || isOpenDescription) && !isMobile && (
          <>
            {event.type === 'panel' && images[currentImageIndex] ? (
              <>
                <ScheduleImageCard
                  index={0}
                  src={images[0]}
                  event={event}
                  isOpenDescription={isOpenDescription}
                  isImageShown={isImageShown}
                />
                <ScheduleImageCard
                  index={1}
                  src={images[currentImageIndex]}
                  event={event}
                  isOpenDescription={isOpenDescription}
                  isImageShown={isImageShown}
                />
              </>
            ) : (
              images?.map((image, index) => {
                return (
                  <ScheduleImageCard
                    key={index}
                    index={index}
                    src={image}
                    event={event}
                    isOpenDescription={isOpenDescription}
                    isImageShown={isImageShown}
                  />
                );
              })
            )}
          </>
        )}

        <div className={c.scheduleCardLeftWrapper}>
          <div className={c.scheduleCardLeft}>
            <p className={c.timeText}>
              {getEventTime(event.startsAt)} - {getEventTime(event.endsAt)}
            </p>
            <p className={c.eventTypeText}>
              {getEventTypeTranslation(event.type)}
            </p>
          </div>
          <div className={c.scheduleCardCenterWrapper}>
            <div className={c.scheduleCardCenter}>
              {event.type !== 'other' && (
                <div className={c.themeBadge}>
                  <p className={c.themeBadgeText}>
                    {getThemeShort(event.theme)}
                  </p>
                </div>
              )}
              <div className={c.scheduleCardTitleWrapper}>
                <h3
                  className={`${c.scheduleCardTitle} ${
                    !event.description ? c.nonClickable : ''
                  }`}>
                  {event.name}
                </h3>
              </div>
            </div>
            {event.speakers?.map((speaker) => {
              return (
                <div key={speaker.id}>
                  <h4 className={c.scheduleCardSubtitle}>
                    {getSpeakerCompanyStringForEvent(speaker)}
                  </h4>
                </div>
              );
            })}
            {isOpenDescription && (
              <div className={c.scheduleCardDescription}>
                {event.description}
              </div>
            )}
          </div>
        </div>
        <div className={c.scheduleCardRight}>
          {event.description !== '' && (
            <button className={c.plusButton}>
              <img src={PlusSvg} alt='plus' />
            </button>
          )}
        </div>
      </div>
      <div className={c.dottedRuler}></div>
    </div>
  );
};

export default ScheduleCard;
