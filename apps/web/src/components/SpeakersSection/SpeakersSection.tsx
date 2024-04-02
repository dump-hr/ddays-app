import { useSpeakerGetAll } from '../../api/speaker/useSpeakerGetAll';
import { useScreenSize } from '../../hooks/useScreenSize';
import SpeakerCard from './SpeakerCard';
import c from './SpeakersSection.module.scss';
import { getCardWidth, getColumns } from './utils';

const SpeakersSection = () => {
  const { screenWidth, isMobile } = useScreenSize(950);
  const cardAspectRatio = 401 / 320;

  const speakers = useSpeakerGetAll();

  if (speakers.isLoading) {
    return <div>Loading...</div>;
  }

  const balancedArray = getColumns(speakers.data!, isMobile);

  const cardWidth = getCardWidth(screenWidth);

  return (
    <>
      <div className={c.background}>
        <div className={c.wrapper}>
          <div className={c.headerContainer}>
            <p className={c.headerSmallText}>
              Digitalni inovatori pod istim krovom
            </p>
            <h2 className={c.headerTitle}>SPEAKERI (23)</h2>
          </div>
          <div className={c.speakersWrapper}>
            {balancedArray.map((subArray, index) => (
              <div key={index} className={c.speakersColumn}>
                {subArray.map((speaker) => (
                  <SpeakerCard
                    key={speaker.id}
                    imageSrc={speaker.photo}
                    firstName={speaker.firstName}
                    lastName={speaker.lastName}
                    title={speaker.title}
                    height={cardWidth * cardAspectRatio}
                    width={cardWidth}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeakersSection;
