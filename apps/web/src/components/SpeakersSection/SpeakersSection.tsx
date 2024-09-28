import { SectionBreaker } from 'components/SectionBreaker';

import { useSpeakerWithCompanyGetAll } from '../../api/speaker/useSpeakerWithCompanyGetAll';

import c from './SpeakersSection.module.scss';

const SpeakersSection = () => {
  const speakers = useSpeakerWithCompanyGetAll();

  if (speakers.isLoading || !speakers.data) {
    return null;
  }

  return (
    <div className={c.background} id='speakeri'>
      <div className={c.wrapper}>
        <div className={c.headerContainer}>
          <p className={c.headerSmallText}>
            Digitalni inovatori pod istim krovom
          </p>
          <h2 className={c.headerTitle}>SPEAKERI ({speakers.data.length})</h2>
        </div>
      </div>
      <div className={c.sectionBreaker}>
        <SectionBreaker fg='green' />
        <div className={c.breakerPadding} />
      </div>
    </div>
  );
};

export default SpeakersSection;
