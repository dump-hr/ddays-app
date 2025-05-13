import React, { forwardRef } from 'react';
import c from './LectureRatingCard.module.scss';
import clsx from 'clsx';

type LectureRatingCardProps = {
  id: string | undefined;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  name: string;
  theme: 'DEV' | 'DESIGN' | 'MARKETING' | 'TECH';
  type:
    | 'LECTURE'
    | 'WORKSHOP'
    | 'FLY_TALK'
    | 'CAMPFIRE_TALK'
    | 'PANEL'
    | 'OTHER';
  speakers: {
    firstName: string;
    lastName: string;
    title: string;
    companyName?: string;
  }[];
};

function getThemeLabel(eventTheme: LectureRatingCardProps['theme']) {
  switch (eventTheme) {
    case 'DEV':
      return 'DEV';
    case 'DESIGN':
      return 'DIZ';
    case 'MARKETING':
      return 'MARK';
    case 'TECH':
      return 'TECH';
  }
}

function getTypeLabel(eventType: LectureRatingCardProps['type']) {
  switch (eventType) {
    case 'LECTURE':
      return 'PREDAVANJE';
    case 'WORKSHOP':
      return 'RADIONICA';
    case 'FLY_TALK':
      return 'FLY TALK';
    case 'CAMPFIRE_TALK':
      return 'CAMPFIRE TALK';
    case 'PANEL':
      return 'PANEL';
    case 'OTHER':
      return 'OSTALO';
  }
}

const LectureRatingCard = forwardRef<HTMLDivElement, LectureRatingCardProps>(
  ({ name, theme, type, speakers, id, className }, ref) => {
    return (
      <div id={id} ref={ref} className={clsx(c.compactScheduleCard, className)}>
        <div className={c.headerRow}>
          <div className={c.infoWrapper}>
            <div className={c.tag}>
              <div className={c.theme}>{getThemeLabel(theme)}</div>
              <p className={c.label}>{getTypeLabel(type)}</p>
            </div>
          </div>
        </div>
        <div className={c.nameSpeakers}>
          <h3 className={c.name}>{name}</h3>
          <p className={c.speakers}>
            {speakers.map(
              (speaker) =>
                `${speaker.firstName} ${speaker.lastName} // ${speaker.title}${
                  speaker.companyName ? ` @ ${speaker.companyName}` : ''
                }`,
            )}
          </p>
        </div>
      </div>
    );
  },
);

export default LectureRatingCard;
