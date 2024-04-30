import { useSpeakerWithCompanyGetAll } from '../../api/speaker/useSpeakerWithCompanyGetAll';
import { useScreenSize } from '../../hooks/useScreenSize';
import SpeakerCard from './SpeakerCard';
import c from './SpeakersSection.module.scss';
import { getCardWidth, getColumns } from './utils';

const SpeakersSection = () => {
  const { screenWidth, isMobile } = useScreenSize(950);
  const cardAspectRatio = 401 / 320;

  const speakers = useSpeakerWithCompanyGetAll();

  if (speakers.isLoading || !speakers.data) {
    return null;
  }

  const balancedArray = getColumns(speakers.data, isMobile);

  const cardWidth = getCardWidth(screenWidth);

  return (
    <div className={c.background} id='speakeri'>
      <div className={c.wrapper}>
        <div className={c.headerContainer}>
          <p className={c.headerSmallText}>
            Digitalni inovatori pod istim krovom
          </p>
          <h2 className={c.headerTitle}>SPEAKERI ({speakers.data.length})</h2>
        </div>
        <div className={c.speakersWrapper}>
          {balancedArray.map((subArray, index) => (
            <div key={index} className={c.speakersColumn}>
              {subArray.map((speaker) => (
                <SpeakerCard
                  key={speaker.id}
                  speaker={speaker}
                  height={cardWidth * cardAspectRatio}
                  width={cardWidth}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakersSection;
