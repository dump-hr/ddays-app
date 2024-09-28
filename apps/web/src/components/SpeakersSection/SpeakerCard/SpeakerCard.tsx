import { SpeakerWithCompanyDto } from '@ddays-app/types';
import c from './SpeakerCard.module.scss';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
} & React.HTMLAttributes<HTMLDivElement>;

const SpeakerCard = ({ speaker, ...handlers }: SpeakerCardProps) => {
  return (
    <div className={c.speakerCard} {...handlers}>
      <img src={speaker.photo} alt='' />
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
