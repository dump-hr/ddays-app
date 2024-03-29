import FilmFrame from 'components/FilmFrame';

import c from './SpeakersSection.module.scss';

type SpeakerCardProps = {
  imageSrc: string | undefined;
  firstName: string;
  lastName: string;
  title: string;
  width: number;
  height: number;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  imageSrc,
  firstName,
  lastName,
  title,
  width,
  height,
}) => {
  return (
    <div style={{ width: width }}>
      <FilmFrame imageSrc={imageSrc} height={height} width={width} />
      <div className={c.cardInfoWrapper}>
        <h3 className={c.cardName}>
          {firstName} {lastName}
        </h3>
        <p className={c.cardTitle}>{title}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;
