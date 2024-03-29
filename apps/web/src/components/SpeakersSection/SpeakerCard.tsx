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
      {/* ovaj iduci div mora bit komponenta */}
      {/* <div
        style={{ height: height, width: width }}
        className={c.cardFrameWrapper}>
        <img className={c.cardFrame} src={FilmFrame} alt='' />
        <img className={c.cardSpeakerPhoto} src={imageSrc} />
      </div> */}
      <FilmFrame imageSrc={imageSrc} height={height} width={width} />
      <div className={c.cardInfoWrapper}>
        <h3 className={c.cardName}>
          {firstName} {lastName}
        </h3>
        <p className={c.cardTitle}>CTO @GETBYBUS</p>
      </div>
    </div>
  );
};

export default SpeakerCard;
