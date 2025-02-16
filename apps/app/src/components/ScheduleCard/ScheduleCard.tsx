import c from './ScheduleCard.module.scss';
import RatingStar from '../../assets/icons/rating-star-1.svg';
import ArrowDown from '../../assets/icons/arrow-down-1.svg';
import Check from '../../assets/icons/check-1.svg';
import Button from '../Button';
import { useState } from 'react';
import clsx from 'clsx';
import { EventWithSpeakerDto, Theme, EventType } from '@ddays-app/types';

type ScheduleCardProps = {
  event: EventWithSpeakerDto;
  isAddedToSchedule?: boolean;
  clickHandler: () => void;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  isAddedToSchedule,
  clickHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className={c.scheduleCard}>
      {isAddedToSchedule && (
        <div className={c.addedToSchedule}>
          <img className={c.ratingStar} src={RatingStar} alt='Rating star' />
          <p className={c.label}>Dodano u tvoj raspored</p>
        </div>
      )}
      <div className={c.timeAndArrow}>
        <p className={c.time}>
          {getTimeFromDate(event.startsAt)} - {getTimeFromDate(event.endsAt)}
        </p>
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
                    src={speaker.photoUrl}
                    alt={speaker.firstName}
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
        className={c.button}
        variant={isAddedToSchedule ? 'black' : 'orange'}
        onClick={clickHandler}>
        {isAddedToSchedule ? 'Izbriši iz rasporeda' : 'Dodaj u svoj raspored'}
      </Button>
    </div>
  );
};

export default ScheduleCard;
