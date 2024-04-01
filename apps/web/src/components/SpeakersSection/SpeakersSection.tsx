import { SpeakerDto } from '@ddays-app/types';

import { useSpeakerGetAll } from '../../api/speaker/useSpeakerGetAll';
import { useScreenSize } from '../../hooks/useScreenSize';
import SpeakerCard from './SpeakerCard';
import c from './SpeakersSection.module.scss';

const getEquallySplitArray = (array: SpeakerDto[], numberOfChunks: number) => {
  if (numberOfChunks < 2) {
    return [array];
  }

  const balancedArray = [] as SpeakerDto[][];

  for (let i = 0; i < numberOfChunks; i++) {
    balancedArray.push([] as SpeakerDto[]);
  }

  for (let i = 0; i < array.length; i++) {
    balancedArray[i % 4].push(array[i]);
  }

  return balancedArray;
};

const getCardWidth = (screenWidth: number) => {
  const desktopSidePadding = 32;
  const desktopCardMargin = 32;
  const numberOfColumns = 4;
  if (screenWidth >= 1440) {
    return 320;
  }

  return (
    (screenWidth -
      2 * desktopSidePadding -
      (numberOfColumns - 1) * desktopCardMargin) /
      numberOfColumns -
    10
  );
};

const SpeakersSection = () => {
  const { screenWidth } = useScreenSize(1000);
  const speakers = useSpeakerGetAll();

  if (speakers.isLoading) {
    return <div>Loading...</div>;
  }

  const cardAspectRatio = 401 / 320;
  const numberOfColumns = 4;

  const balancedArray = getEquallySplitArray(speakers.data!, numberOfColumns);

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
            {balancedArray.map((subArray) => (
              <div className={c.speakersColumn}>
                {subArray.map((speaker) => (
                  <SpeakerCard
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
