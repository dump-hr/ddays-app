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
    balancedArray[i % numberOfChunks].push(array[i]);
  }

  return balancedArray;
};

const getColumns = (array: SpeakerDto[], isMobile: boolean) => {
  const desktopNumberOfColumns = 4;
  const mobileNumberOfColumns = 2;

  if (isMobile) {
    return getEquallySplitArray(array, mobileNumberOfColumns);
  }

  return getEquallySplitArray(array, desktopNumberOfColumns);
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
    5
  );
};

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
