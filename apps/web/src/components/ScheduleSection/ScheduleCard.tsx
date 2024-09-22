import { EventWithSpeakerDto } from '@ddays-app/types';
import { useEffect, useState } from 'react';

import PlusSvg from '../../assets/Plus.svg';
import { useScreenSize } from '../../hooks/useScreenSize';
import c from './ScheduleSection.module.scss';
import {
  getEventTime,
  getEventTypeTranslation,
  getSpeakerCompanyStringForEvent,
} from './utils';

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
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = event.speakers
    ?.filter((speaker) => speaker.photo !== null)
    .map((speaker) => speaker.photo) || [''];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const cardAspectRatio = 401 / 320;
  const { isMobile } = useScreenSize(930);

  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isImageShown, setIsImageShown] = useState(false);

  const toggleOpenDescription = () => {
    setIsOpenDescription((prev) => !prev);
  };

  const handleCardClick = () => {
    toggleOpenDescription();
  };

  const handleHover = () => {
    if (!isOpenDescription) {
      setIsImageShown(true);
    }
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
        {(isImageShown || isOpenDescription) &&
          !isMobile &&
          images[currentImageIndex] && (
            <div className={c.speakerPhoto}>
              <img
                src={images[currentImageIndex]}
                height={cardAspectRatio * 120}
                width={120}
              />
            </div>
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
                <h3 className={c.scheduleCardTitle}>{event.name}</h3>
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
      <div className={c.dottedRuler}>
        .........................................................................................................................................................................................................................
      </div>
    </div>
  );
};

export default ScheduleCard;
