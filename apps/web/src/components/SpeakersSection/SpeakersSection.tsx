import { SpeakerDto } from '@ddays-app/types';

import { useSpeakerGetAll } from '../../api/speaker/useSpeakerGetAll';
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

const SpeakersSection = () => {
  const speakers = useSpeakerGetAll();

  if (speakers.isLoading) {
    return <div>Loading...</div>;
  }

  const balancedArray = getEquallySplitArray(speakers.data!, 4);

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
                    height={401}
                    width={320}
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
