import React, { forwardRef } from 'react';
import c from './LectureRatingCard.module.scss';
import { getThemeLabel } from '../../helpers/getThemeLabel';
import { getTypeLabel } from '../../helpers/getTypeLabel';
import clsx from 'clsx';
import { EventWithSpeakerDto } from '@ddays-app/types';

type LectureRatingCardProps = {
  event: EventWithSpeakerDto;
  id: string | undefined;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

const LectureRatingCard = forwardRef<HTMLDivElement, LectureRatingCardProps>(
  ({ event, id, className }, ref) => {
    return (
      <div id={id} ref={ref} className={clsx(c.LectureRatingCard, className)}>
        <div className={c.headerRow}>
          <div className={c.infoWrapper}>
            <div className={c.tag}>
              <p className={c.theme}>{getThemeLabel(event.theme)}</p>
            </div>
            <p className={c.type}>{getTypeLabel(event.type)}</p>
          </div>
        </div>
        <div className={c.nameSpeakers}>
          <h3 className={c.name}>{event.name}</h3>
          <p className={c.speakers}>
            {event.speakers?.map(
              (speaker) =>
                `${speaker.firstName} ${speaker.lastName} // ${speaker.title} @ ${speaker.company?.name}`,
            )}
          </p>
        </div>
      </div>
    );
  },
);

export default LectureRatingCard;
