import { SectionBreaker } from 'components/SectionBreaker';

import { useSpeakerWithCompanyGetAll } from '../../api/speaker/useSpeakerWithCompanyGetAll';
import SpeakerCard from './SpeakerCard';
import c from './SpeakersSection.module.scss';

const SpeakersSection = () => {
  const fetchedSpeakers = useSpeakerWithCompanyGetAll();

  if (fetchedSpeakers.isLoading || !fetchedSpeakers.data) {
    return null;
  }

  const speakers = fetchedSpeakers.data;

  return (
    <section className={c.speakersSection} id='speakeri'>
      <div className={c.titleWrapper}>
        <p className={c.subtitle}>Digitalni inovatori pod istim krovom</p>
        <h1 className={c.title}>Speakeri</h1>
      </div>
      <div className={c.speakerCardsWrapper}>
        {speakers?.map((speaker, index) => (
          <SpeakerCard
            className={c.speakerCard}
            key={index}
            speaker={speaker}
          />
        ))}
      </div>
      <SectionBreaker fg='green' />
    </section>
  );
};

export default SpeakersSection;
