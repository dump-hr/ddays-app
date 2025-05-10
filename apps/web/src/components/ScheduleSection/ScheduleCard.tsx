import { EventType, EventWithSpeakerDto } from '@ddays-app/types';
import MinusSvg from 'assets/icons/minus-black.svg';
import PlusSvg from 'assets/icons/plus-black.svg';
import { useEffect, useState } from 'react';

import { useScreenSize } from '../../hooks/useScreenSize';
import ScheduleImageCard from './ScheduleImageCard';
import c from './ScheduleSection.module.scss';
import {
  getEventTime,
  getSpeakerCompanyStringForEvent,
  getThemeShort,
  getEventTypeTranslation,
} from './utils';

type ScheduleCardProps = {
  event: EventWithSpeakerDto;
  openCardId: number | null;
  setOpenCardId: (id: number | null) => void;
  lastClickedCardId: React.MutableRefObject<number | null>;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  openCardId,
  setOpenCardId,
  lastClickedCardId,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);
  const [isImageShown, setIsImageShown] = useState<boolean>(false);

  const { isMobile } = useScreenSize(1030);
  const isOpenDescription = openCardId === event.id;

  const imagesList = event.speakers
    ?.filter((speaker) => speaker.photoUrl !== null)
    .map((speaker) => speaker.photoUrl);

  const images = imagesList?.length === 0 ? [''] : imagesList!;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % images!.length;
        if (next === 0) return 1;
        return next;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = () => {
    if (!event.description) return;

    if (isOpenDescription) {
      setOpenCardId(null);
      lastClickedCardId.current = event.id;
    } else {
      setOpenCardId(event.id);
      lastClickedCardId.current = -1;
    }
  };

  const handleHover = () => {
    if (isOpenDescription) {
      lastClickedCardId.current = event.id;
    } else {
      setIsImageShown(true);
      lastClickedCardId.current = -1;
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
        {(isImageShown || isOpenDescription) && !isMobile && (
          <>
            {event.type === EventType.PANEL && images[currentImageIndex] && (
              <>
                <ScheduleImageCard
                  index={0}
                  src={images[0]}
                  event={event}
                  isOpenDescription={isOpenDescription}
                  isImageShown={isImageShown}
                  imagesLength={images.length}
                  lastClickedCardId={lastClickedCardId}
                />
                <ScheduleImageCard
                  index={1}
                  src={images[currentImageIndex]}
                  event={event}
                  isOpenDescription={isOpenDescription}
                  isImageShown={isImageShown}
                  imagesLength={images.length}
                  lastClickedCardId={lastClickedCardId}
                />
              </>
            )}

            {event.type !== EventType.PANEL &&
              images.map((image, index) => {
                return (
                  <ScheduleImageCard
                    key={index}
                    index={index}
                    src={image}
                    event={event}
                    isOpenDescription={isOpenDescription}
                    isImageShown={isImageShown}
                    imagesLength={images.length}
                    lastClickedCardId={lastClickedCardId}
                  />
                );
              })}
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
              {event.type !== EventType.OTHER && (
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
          {event.description && (
            <button className={c.plusButton}>
              {isOpenDescription ? (
                <img src={MinusSvg} alt='minus' />
              ) : (
                <img src={PlusSvg} alt='plus' />
              )}
            </button>
          )}
        </div>
      </div>
      <div className={c.dottedRuler}></div>
    </div>
  );
};

export default ScheduleCard;
