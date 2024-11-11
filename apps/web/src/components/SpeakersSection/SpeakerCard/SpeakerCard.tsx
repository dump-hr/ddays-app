import { SpeakerWithCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';

import c from './SpeakerCard.module.scss';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
} & React.HTMLAttributes<HTMLDivElement>;

const SpeakerCard = ({ speaker, ...handlers }: SpeakerCardProps) => {
  const classes = clsx({
    [c.speakerCard]: true,
    [handlers.className as string]: handlers.className,
  });

  return (
    <div className={c.speakerCard} {...handlers}>
      <img className={classes} src={speaker.photo} alt='' />
      <p>
        {speaker.firstName} {speaker.lastName}
      </p>
      <p>
        {speaker.title} @ {speaker.company?.name}
      </p>
    </div>
  );
};

export default SpeakerCard;
