import { useLocation } from 'wouter';

import CircularButton from '../../components/CircularButton';
import InfoCard from '../../components/InfoCard';
import JobOffer from '../../components/InfoCard/JobOffer';
import LayoutSpacing from '../../components/LayoutSpacing';
import Pill from '../../components/Pill';
import CoverImage from './assets/cover.png';
import ProficoLogo from './assets/profico-logo.png';
import c from './CompanyProfile.module.scss';

const data = {
  description: '',
  jobOffers: [
    {
      title: 'Java Developer',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      location: 'Split',
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
  return (
    <>
      {data.jobOffers.map((jobOffer) => (
        <JobOffer
          title={jobOffer.title}
          description={jobOffer.description}
          location={jobOffer.location}
        />
      ))}
    </>
  );
};

const CompanyProfile = () => {
  const [, setLocation] = useLocation();
  function dataIsEmpty() {
    return (
      data.interests.development.length == 0 &&
      data.interests.design.length == 0 &&
      data.interests.marketing.length == 0 &&
      data.interests.tech.length == 0
    );
  }

  return (
    <>
      <section className={c.headerInfo}>
        <LayoutSpacing style={{ height: '100%' }}>
          <img src={CoverImage} className={c.coverImage} alt='Cover' />
          <div className={c.basicInfo}>
            <img src={ProficoLogo} className={c.logoImage} />
            <div className={c.infoContainer}>
              <div className={c.companyName}>
                <h3>Profico</h3>
                <p>profi.co</p>
              </div>
              <CircularButton
                className={c.submitButton}
                onClick={() => setLocation('/materials')}>
                {dataIsEmpty() ? 'Predaj materijale' : 'Uredi materijale'}
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
                {data.jobOffers.length == 0 ? (
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
