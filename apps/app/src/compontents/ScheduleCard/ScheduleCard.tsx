import c from './ScheduleCard.module.scss';
import RatingStar from '../../assets/icons/rating-star-1.svg';
import ArrowDown from '../../assets/icons/arrow-down-1.svg';

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
};

type ScheduleCardProps = {
  event: EventProps;
  isAddedToSchedule: boolean;
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  event,
  isAddedToSchedule,
}) => {
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
          className={c.arrowDown}
          src={ArrowDown}
          alt='Arrow pointing down'
        />
      </div>
      <div className={c.tag}>
        <div className={c.theme}>{getThemeLabel(event.theme)}</div>
        <p className={c.label}>{getTypeLabel(event.type)}</p>
      </div>
      <h3>{event.name}</h3>
    </div>
  );
};

export default ScheduleCard;
