import { EventType, EventWithSpeakerDto, Theme } from '@ddays-app/types';
import c from './ScheduleCard.module.scss';
import {
  getThemeLabel,
  getTypeLabel,
  getTimeFromDate,
} from './schedule.helpers';

interface ScheduleCardPreviewProps {
  event: EventWithSpeakerDto;
}

const ScheduleCardPreview = ({ event }: ScheduleCardPreviewProps) => {
  return (
    <div className={c.scheduleCard}>
      <div className={c.timeAndArrow}>
        <div className={c.timeWrapper}>
          <p className={c.time}>
            {getTimeFromDate(event.startsAt)} - {getTimeFromDate(event.endsAt)}
          </p>
        </div>
      </div>
      <div className={c.divider} />
      <div className={c.tag}>
        <div className={c.theme}>{getThemeLabel(event.theme as Theme)}</div>
        <p className={c.label}>{getTypeLabel(event.type as EventType)}</p>
      </div>
      <h3 className={c.eventName}>{event.name}</h3>

      <div className={c.speakers}>
        {event.speakers &&
          event.speakers.map(
            (
              speaker,
              index, // Pod pretpostavkom da je moderator prvi u listi (ako je panel).
            ) => (
              <>
                <div className={c.speaker} key={index}>
                  <div className={c.speakerInfoWrapper}>
                    <p className={c.fullName}>
                      {speaker.firstName} {speaker.lastName}//{speaker.title}{' '}
                      {speaker?.company?.name}
                    </p>
                  </div>
                </div>
              </>
            ),
          )}
      </div>
    </div>
  );
};

export default ScheduleCardPreview;
