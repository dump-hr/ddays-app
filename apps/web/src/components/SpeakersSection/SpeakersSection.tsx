import { SectionBreaker } from 'components/SectionBreaker';
import { useSpeakerWithCompanyGetAll } from '../../api/speaker/useSpeakerWithCompanyGetAll';
import c from './SpeakersSection.module.scss';

const SpeakersSection = () => {
  const speakers = useSpeakerWithCompanyGetAll();

  if (speakers.isLoading || !speakers.data) {
    return null;
  }

  return (
    <section className={c.speakersSection} id='speakeri'>
      <div className={c.titleWrapper}>
        <p className={c.subtitle}>Digitalni inovatori pod istim krovom</p>
        <h1 className={c.title}>Speakeri</h1>
      </div>
      <div className={c.speakerCardsWrapper}></div>
      <SectionBreaker fg='green' />
    </section>
  );
};

export default SpeakersSection;
