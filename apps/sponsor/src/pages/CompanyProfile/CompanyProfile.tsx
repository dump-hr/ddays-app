import { FormSteps } from '@ddays-app/types';
import { useState } from 'react';
import { useLocation } from 'wouter';

import { useGetLoggedCompany } from '../../api/useGetLoggedCompany';
import CircularButton from '../../components/CircularButton';
import InfoCard from '../../components/InfoCard';
import JobOffer from '../../components/InfoCard/JobOffer';
import LayoutSpacing from '../../components/LayoutSpacing';
import Modal from '../../components/Modal';
import Pill from '../../components/Pill';
import { sponsorForm } from '../../constants/forms';
import CoverImage from './assets/cover.png';
import c from './CompanyProfile.module.scss';

// Until API is implemented
const data = {
  jobOffers: [
    {
      title: 'Java Developer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Split',
    },
  ],
  interests: {
    development: ['react', 'angular', 'vue', 'node', 'php', 'java', 'python'],
    design: ['ui', 'ux', 'graphic', 'web', 'illustration'],
    marketing: ['seo', 'social', 'email', 'content', 'analytics '],
    tech: ['hardware', 'software', 'networking', 'security'],
  },
};

const InterestsCardContent = () => {
  const interestCategories = Object.keys(data.interests);
  type Category = keyof typeof data.interests;

  return (
    <>
      {interestCategories.map((category) => {
        const categoryName = `${
          category.charAt(0).toUpperCase() + category.slice(1)
        }`;
        const interests = data.interests[category as Category];

        return (
          <>
            <p className={c.cardContentParagraph}>
              {`${categoryName} (${interests.length})`}
            </p>
            <div className={c.pillGroup}>
              {interests.map((interest) => (
                <Pill key={interest} text={interest} />
              ))}
            </div>
          </>
        );
      })}
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
  const [currentModal, setCurrentModal] = useState<keyof typeof FormSteps>();

  //const { data: sponsorDescription } = useGetSponsorDescription();
  const { data: company } = useGetLoggedCompany();

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
      {currentModal !== undefined && (
        <Modal
          form={sponsorForm[currentModal]}
          close={() => setCurrentModal(undefined)}
        />
      )}
      <section className={c.headerInfo}>
        <LayoutSpacing style={{ height: '100%' }}>
          <img
            src={company?.landingImage || CoverImage}
            className={c.coverImage}
            alt='Cover'
          />
          <div className={c.basicInfo}>
            <img src={company?.logoImage} className={c.logoImage} />
            <div className={c.infoContainer}>
              <div className={c.companyName}>
                <h3>{company?.name}</h3>
                <p>{company?.email}</p>
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
                onClick={() => setCurrentModal(FormSteps.Description)}>
                <p className={c.cardContentParagraph}>
                  {company?.description || 'Nema opisa'}
                </p>
              </InfoCard>
              <InfoCard
                title='Interesi'
                buttonText='Odaberite svoje interese'
                onClick={() => setCurrentModal(FormSteps.Interests)}>
                <InterestsCardContent />
              </InfoCard>
            </div>
            <div className={c.right}>
              <InfoCard
                title='Oglasi za posao'
                buttonText='Postavite oglase za posao'
                onClick={() => setCurrentModal(FormSteps.Jobs)}>
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
