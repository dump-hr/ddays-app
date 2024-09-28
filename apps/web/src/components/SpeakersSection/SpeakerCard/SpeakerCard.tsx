import { SpeakerWithCompanyDto } from '@ddays-app/types';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
};

const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  return (
    <div>
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
