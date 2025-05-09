import { useEffect, useState } from 'react';
import clsx from 'clsx';
import c from './ScheduleCard.module.scss';
import { EventWithSpeakerDto, Theme, EventType } from '@ddays-app/types';

import RatingStar from '@/assets/icons/rating-star-1.svg';
import ArrowDown from '@/assets/icons/arrow-down-1.svg';
import Check from '@/assets/icons/check-mark-icon.svg';
import WorkshopConfirmPopup from '@/pages/SchedulePage/popups/WorkshopConfirmPopup/WorkshopConfirmPopup';
import Button from '../Button';
import {
  getThemeLabel,
  getTypeLabel,
  getTimeFromDate,
} from './schedule.helpers';
import { useEventGetParticipantsCount } from '@/api/event/useEventGetParticipantsCount';

type ScheduleCardProps = {
  event: EventWithSpeakerDto;
  isAddedToSchedule?: boolean;
  handleAddToPersonalSchedule: (eventId: number) => void;
  handleRemoveFromPersonalSchedule: (eventId: number) => void;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  isAddedToSchedule,
  handleAddToPersonalSchedule,
  handleRemoveFromPersonalSchedule,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: eventParticipantsCount } = useEventGetParticipantsCount(
    event.id,
  );
  const [isWorkshopConfirmPopupOpen, setIsWorkshopConfirmPopupOpen] =
    useState(false);

  const [isLive, setIsLive] = useState(() => {
    const now = new Date().getTime();
    const start = new Date(event.startsAt).getTime();
    const end = new Date(event.endsAt).getTime();

    return now >= start && now <= end;
  });

  function handleClick() {
    if (!isOpen) return;

    if (isAddedToSchedule) {
      handleRemoveFromPersonalSchedule(event.id);
    } else {
      if (event.type === EventType.WORKSHOP) {
        setIsWorkshopConfirmPopupOpen(true);
        return;
      }
      handleAddToPersonalSchedule(event.id);
    }
  }

  function getButtonText() {
    if (isAddedToSchedule) return 'Izbriši iz rasporeda';
    if (eventParticipantsCount?.count === event.maxParticipants)
      return 'Popunjeno';

    return 'Dodaj u svoj raspored';
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
            <Requirements requirements={event.requirements} />
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
                    src={speaker.smallPhotoUrl}
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
        className={clsx({
          [c.button]: true,
          [c.collapsibleContent]: true,
          [c.collapsed]: !isOpen,
        })}
        variant={isAddedToSchedule ? 'black' : 'orange'}
        onClick={handleClick}
        disabled={eventParticipantsCount?.count === event.maxParticipants}>
        {getButtonText()}
      </Button>

      {event.type === EventType.WORKSHOP && isWorkshopConfirmPopupOpen && (
        <WorkshopConfirmPopup
          isOpen={isWorkshopConfirmPopupOpen}
          closePopup={() => setIsWorkshopConfirmPopupOpen(false)}
          event={event}
          handleAddToPersonalSchedule={() =>
            handleAddToPersonalSchedule(event.id)
          }>
          <Requirements requirements={event.requirements || ''} />
        </WorkshopConfirmPopup>
      )}
    </div>
  );
};

const Requirements = ({ requirements }: { requirements: string }) => {
  function getRequirements(eventRequirements: string) {
    return eventRequirements.split('//') as string[];
  }

  return (
    <div className={c.eventRequirements}>
      <p className={c.mainLabel}>ZAHTJEVI:</p>
      {getRequirements(requirements).map((requirement, index) => (
        <div key={index} className={c.requirement}>
          <div className={c.checkContainer}>
            <img className={c.check} src={Check} alt='Check' />
          </div>
          <p className={c.label}>{requirement}</p>
        </div>
      ))}
    </div>
  );
};

export default ScheduleCard;
