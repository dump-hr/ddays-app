import c from './ScheduleCard.module.scss';
import RatingStar from '../../assets/icons/rating-star-1.svg';
import ArrowDown from '../../assets/icons/arrow-down-1.svg';
import Check from '../../assets/icons/check-mark-icon.svg';
import Button from '../Button';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { EventWithSpeakerDto, Theme, EventType } from '@ddays-app/types';

type ScheduleCardProps = {
  event: EventWithSpeakerDto;
  isAddedToSchedule?: boolean;
  clickHandler: () => void;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  isAddedToSchedule, // BE: Provjerite implementaciju ovoga (ide li kroz event ili treba posebno queryjat)
  clickHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLive, setIsLive] = useState(() => {
    const now = new Date().getTime();
    const start = new Date(event.startsAt).getTime();
    const end = new Date(event.endsAt).getTime();

    return now >= start && now <= end;
  });

  function getThemeLabel(eventTheme: Theme) {
    switch (eventTheme) {
      case Theme.DEV:
        return 'DEV';
      case Theme.DESIGN:
        return 'DIZ';
      case Theme.MARKETING:
        return 'MARK';
      case Theme.TECH:
        return 'TECH';
    }
  }

  function getTypeLabel(eventType: EventType) {
    switch (eventType) {
      case EventType.LECTURE:
        return 'PREDAVANJE';
      case EventType.WORKSHOP:
        return 'RADIONICA';
      case EventType.FLY_TALK:
        return 'FLY TALK';
      case EventType.CAMPFIRE_TALK:
        return 'CAMPFIRE TALK';
      case EventType.PANEL:
        return 'PANEL';
      case EventType.OTHER:
        return 'OSTALO';
    }
  }

  function getTimeFromDate(date: string): string {
    const dateObj = new Date(date);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function getRequirements(eventRequirements: string) {
    return eventRequirements.split(
      '/',
    ) as string[]; /* TODO: Prominit kada se sazna na koji je nacin ovaj podatak zapisan u bazi. Stilovi su spremni. */
  }

  useEffect(() => {
    const startMs = new Date(event.startsAt).getTime();
    const endMs = new Date(event.endsAt).getTime();

    const updateStatus = () => {
      const now = new Date().getTime();
      setIsLive(now >= startMs && now <= endMs);
    };

    updateStatus();

    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, [event.startsAt, event.endsAt]);

  return (
    <div className={c.scheduleCard}>
      {isAddedToSchedule && (
        <div className={c.addedToSchedule}>
          <img className={c.ratingStar} src={RatingStar} alt='Rating star' />
          <p className={c.label}>Dodano u tvoj raspored</p>
        </div>
      )}
      <div className={c.timeAndArrow}>
        <div className={c.timeWrapper}>
          {isLive && (
            <div className={c.live}>
              <div className={c.icon}>
                <div className={c.innerCircle} />
              </div>
            </div>
          )}
          <p className={c.time}>
            {getTimeFromDate(event.startsAt)} - {getTimeFromDate(event.endsAt)}
          </p>
        </div>

        <img
          className={clsx({
            [c.arrowDown]: true,
            [c.collapsed]: !isOpen,
          })}
          src={ArrowDown}
          alt='Arrow pointing down'
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <div className={c.tag}>
        <div className={c.theme}>{getThemeLabel(event.theme as Theme)}</div>
        <p className={c.label}>{getTypeLabel(event.type as EventType)}</p>
      </div>
      <h3 className={c.eventName}>{event.name}</h3>

      <section
        className={clsx({
          [c.collapsibleContent]: true,
          [c.collapsed]: !isOpen,
        })}>
        {event.description && (
          <p className={c.eventDescription}>{event.description}</p>
        )}

        {event.requirements && (
          <>
            <div className={c.divider} />
            <div className={c.eventRequirements}>
              <p className={c.mainLabel}>ZAHTJEVI:</p>
              {getRequirements(event.requirements).map((requirement, index) => (
                <div key={index} className={c.requirement}>
                  <div className={c.checkContainer}>
                    <img className={c.check} src={Check} alt='Check' />
                  </div>
                  <p className={c.label}>{requirement}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <div className={c.divider} />
      {event.type === EventType.PANEL && (
        <p className={c.moderatorLabel}>Voditelj panela:</p>
      )}
      <div className={c.speakers}>
        {event.speakers &&
          event.speakers.map(
            (
              speaker,
              index, // Pod pretpostavkom da je moderator prvi u listi (ako je panel).
            ) => (
              <>
                <div className={c.speaker} key={index}>
                  <img
                    className={c.image}
                    src={speaker.photoUrl} // BE TODO: treba bi photourl imat 2 podfielda: jedan za veliku sliku sta je na webu i jedan za malu sta je tu
                    alt={speaker.firstName} // tj. mainPhotoUrl i thumbnailUrl, pogledaj seed za primjer
                  />
                  <div className={c.speakerInfoWrapper}>
                    <p className={c.fullName}>
                      {speaker.firstName} {speaker.lastName}
                    </p>
                    <p className={c.title}>{speaker.title}</p>
                    <div className={c.logoContainer}>
                      <img
                        className={c.logo}
                        src={speaker.company?.logoImage}
                        alt=''
                      />
                    </div>
                  </div>
                </div>
                {event.type === EventType.PANEL && index === 0 && (
                  <div className={c.divider} />
                )}
              </>
            ),
          )}
      </div>
      <Button
        className={clsx({
          [c.button]: true,
          [c.collapsibleContent]: true,
          [c.collapsed]: !isOpen,
        })}
        variant={isAddedToSchedule ? 'black' : 'orange'}
        onClick={clickHandler}>
        {' '}
        {/* BE: ako vam je lakse, mozda je bolje ovo implementirat unutar ove komponente, ne izvan nje. */}
        {isAddedToSchedule ? 'Izbriši iz rasporeda' : 'Dodaj u svoj raspored'}
      </Button>
    </div>
  );
};

export default ScheduleCard;
