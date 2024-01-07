import CircularButton from '../../components/CircularButton';
import InfoCard from '../../components/InfoCard';
import LayoutSpacing from '../../components/LayoutSpacing';
import Pill from '../../components/Pill';
import CoverImage from './assets/cover.png';
import c from './CompanyProfile.module.scss';

const data = {
  description: '',
  jobOffers: [
    {
      title: '',
      description: '',
      location: '',
    },
    {
      title: '',
      description: '',
      location: '',
    },
  ],
  interests: {
    development: ['react', 'angular', 'vue', 'node', 'php', 'java', 'python'],
    design: [],
    marketing: [],
    tech: [],
  },
};

const InterestsCardContent = () => {
  return (
    <>
      <p className={c.cardContentParagraph}>
        Development ({data.interests.development.length})
      </p>
      <div className={c.pillGroup}>
        {data.interests.development.map((interest) => (
          <Pill key={interest} text={interest} />
        ))}
      </div>
      <p className={c.cardContentParagraph}>
        Design ({data.interests.design.length})
      </p>
      <p className={c.cardContentParagraph}>
        Marketing ({data.interests.marketing.length})
      </p>
      <p className={c.cardContentParagraph}>
        Tech ({data.interests.tech.length})
      </p>
    </>
  );
};

const JobOffersCardContent = () => {
  return <></>;
};

const CompanyProfile = () => {
  return (
    <>
      <section className={c.headerInfo}>
        <LayoutSpacing style={{ height: '100%' }}>
          <img src={CoverImage} className={c.coverImage} alt='Cover' />
          <div className={c.basicInfo}>
            <div className={c.logoImage}></div>
            <div className={c.infoContainer}>
              <div className={c.companyName}>
                <h3>Profico</h3>
                <p>profi.co</p>
              </div>
              <CircularButton className={c.submitButton}>
                Predaj materijale
              </CircularButton>
            </div>
          </div>
        </LayoutSpacing>
      </section>
      <section className={c.mainCards}>
        <LayoutSpacing>
          <div className={c.cardsLayout}>
            <div className={c.left}>
              <InfoCard
                title='Uvod'
                buttonText='Dodajte svoje kratko predstavljanje'
                onClick={() => console.log('Clicked')}>
                <p className={c.cardContentParagraph}>
                  {data.description || 'Nema opisa'}
                </p>
              </InfoCard>
              <InfoCard
                title='Interesi'
                buttonText='Odaberite svoje interese'
                onClick={() => console.log('Clicked')}>
                <InterestsCardContent />
              </InfoCard>
            </div>
            <div className={c.right}>
              <InfoCard
                title='Oglasi za posao'
                buttonText='Postavite oglase za posao'
                onClick={() => console.log('Clicked')}>
                {data.jobOffers.length > 0 ? (
                  <p className={c.cardContentParagraph}>
                    Nema postavljenih oglasa
                  </p>
                ) : (
                  <JobOffersCardContent />
                )}
              </InfoCard>
            </div>
          </div>
        </LayoutSpacing>
      </section>
    </>
  );
};

export default CompanyProfile;
