import c from './ScheduleCard.module.scss';
import RatingStar from '../../assets/icons/rating-star-1.svg';
import ArrowDown from '../../assets/icons/arrow-down-1.svg';
import Check from '../../assets/icons/check-1.svg';
import Button from '../../components/Button';
import { useState } from 'react';
import clsx from 'clsx';

/*
export const theme = pgEnum('theme', ['dev', 'design', 'marketing', 'tech']);

export const eventType = pgEnum('event_type', [
  'lecture',
  'workshop',
  'flyTalk',
  'campfireTalk',
  'panel',
  'other',
]);

export const event = pgTable('event', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: eventType('type'),
  theme: theme('theme'),
  startsAt: text('starts_at').notNull(),
  endsAt: text('ends_at').notNull(),
  requirements: text('requirements'),
  footageLink: text('footage_link'),
  maxParticipants: integer('max_participants'),
  codeId: integer('code_id').references(() => code.id),
});
*/

type Speaker = {
  firstName: string;
  lastName: string;
  title: string;
  logoImage: string;
  thumbnailUrl: string;
};

type EventType =
  | 'lecture'
  | 'workshop'
  | 'flyTalk'
  | 'campfireTalk'
  | 'panel'
  | 'other';
type EventTheme = 'dev' | 'design' | 'marketing' | 'tech';

export type EventProps = {
  name: string;
  description?: string;
  type: EventType;
  theme: EventTheme;
  startsAt: string;
  endsAt: string;
  requirements?: string[];
  speakers: Speaker[];
  moderator?: Speaker;
};

type ScheduleCardProps = {
  event: EventProps;
  isAddedToSchedule: boolean;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  isAddedToSchedule,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function getThemeLabel(eventTheme: EventTheme) {
    switch (eventTheme) {
      case 'dev':
        return 'DEV';
      case 'design':
        return 'DIZ';
      case 'marketing':
        return 'MARK';
      case 'tech':
        return 'MULT';
    }
  }

  function getTypeLabel(eventType: EventType) {
    switch (eventType) {
      case 'lecture':
        return 'PREDAVANJE';
      case 'workshop':
        return 'RADIONICA';
      case 'flyTalk':
        return 'FLY TALK';
      case 'campfireTalk':
        return 'CAMPFIRE TALK';
      case 'panel':
        return 'PANEL';
      case 'other':
        return 'OSTALO';
    }
  }

  function getTimeFromDate(date: string) {
    const dateObj = new Date(date);
    return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
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
        <div className={c.theme}>{getThemeLabel(event.theme)}</div>
        <p className={c.label}>{getTypeLabel(event.type)}</p>
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

        <div className={c.divider} />
        {event.requirements && (
          <div className={c.eventRequirements}>
            <p className={c.mainLabel}>ZAHTJEVI:</p>
            {event.requirements.map((requirement, index) => (
              <div key={index} className={c.requirement}>
                <div className={c.checkContainer}>
                  <img className={c.check} src={Check} alt='Check' />
                </div>
                <p className={c.label}>{requirement}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {event.moderator && (
        <>
          <div className={c.divider} />
          <p className={c.moderatorLabel}>Voditelj panela:</p>
          <div className={c.speaker}>
            <img
              className={c.image}
              src={event.moderator.thumbnailUrl}
              alt={event.moderator.firstName}
            />
            <div className={c.speakerInfoWrapper}>
              <p className={c.fullName}>
                {event.moderator.firstName} {event.moderator.lastName}
              </p>
              <p className={c.title}>{event.moderator.title}</p>
              <img className={c.logo} src={event.moderator.logoImage} alt='' />
            </div>
          </div>
        </>
      )}
      <div className={c.divider} />
      <div className={c.speakers}>
        {event.speakers.map((speaker, index) => (
          <div className={c.speaker} key={index}>
            <img
              className={c.image}
              src={speaker.thumbnailUrl}
              alt={speaker.firstName}
            />
            <div className={c.speakerInfoWrapper}>
              <p className={c.fullName}>
                {speaker.firstName} {speaker.lastName}
              </p>
              <p className={c.title}>{speaker.title}</p>
              <img className={c.logo} src={speaker.logoImage} alt='' />
            </div>
          </div>
        ))}
      </div>

      <Button className={c.button} variant='orange'>
        Dodaj u svoj raspored
      </Button>
    </div>
  );
};

export default ScheduleCard;
