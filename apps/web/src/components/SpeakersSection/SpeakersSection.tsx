import LocomotiveScroll from 'locomotive-scroll';

import { useSpeakerGetAll } from '../../api/speaker/useSpeakerGetAll';
import SpeakerCard from './SpeakerCard';
import c from './SpeakersSection.module.scss';

const SpeakersSection = () => {
  const speakers = useSpeakerGetAll();

  if (speakers.isLoading) {
    return <div>Loading...</div>;
  }

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
          <SpeakerCard
            imageSrc={speakers.data![0].photo}
            firstName={speakers.data![0].firstName}
            lastName={speakers.data![0].lastName}
            title={speakers.data![0].title}
            height={401}
            width={320}
          />
          {/* <div className={c.speakersWrapper}>
            {speakers.data?.map((speaker) => (
              <div className={c.speakerFrame}>
                <img
                  className={c.speakerImage}
                  src={speaker.photo}
                  alt={speaker.firstName}
                />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SpeakersSection;
