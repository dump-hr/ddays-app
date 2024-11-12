import { SpeakerWithCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';

import c from './SpeakerCard.module.scss';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
} & React.HTMLAttributes<HTMLDivElement>;

const SpeakerCard = ({ speaker, className, ...handlers }: SpeakerCardProps) => {
  const classes = clsx(c.speakerCard, className);

  return (
    <div className={classes} {...handlers}>
      <img className={c.image} src={speaker.photo} alt='' />
      <p className={c.fullName}>
        {speaker.firstName} {speaker.lastName}
      </p>
      {speaker.title && speaker.company?.name && (
        <p className={c.position}>
          {speaker.title} @ {speaker.company?.name}
        </p>
      )}
    </div>
  );
};

export default SpeakerCard;
