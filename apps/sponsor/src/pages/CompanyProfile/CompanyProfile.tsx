import { CompanyPublicDto, JobDto, Theme } from '@ddays-app/types';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'wouter';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';
import CoverPlaceholder from '../../assets/images/profile-cover-placeholder.png';
import LogoPlaceholder from '../../assets/images/profile-logo-placeholder.png';
import { CircularButton } from '../../components/CircularButton';
import { InfoCard } from '../../components/InfoCard';
import { JobOffer } from '../../components/InfoCard/JobOffer';
import { LayoutSpacing } from '../../components/LayoutSpacing';
import { Modal } from '../../components/Modal';
import { Pill } from '../../components/Pill';
import { sponsorForm } from '../../constants/forms';
import { interestLabels } from '../../constants/labels';
import { getPageTitle } from '../../helpers';
import { FormSteps } from '../../types/form';
import c from './CompanyProfile.module.scss';

type CardContentProps = {
  company?: CompanyPublicDto;
};

const InterestsCardContent: React.FC<CardContentProps> = ({ company }) => {
  const getInterestCount = (theme: Theme) =>
    company?.interests?.filter((interest) => interest.theme === theme).length;

  const getInterestsByTheme = (theme: Theme) =>
    company?.interests?.filter((interest) => interest.theme === theme);

  return (
    <>
      {Object.values(Theme).map((theme: Theme) => {
        const interests = getInterestsByTheme(theme);

        return (
          <div key={theme}>
            <p className={c.cardContentParagraph}>
              {interestLabels[theme]} ({getInterestCount(theme)})
            </p>
            <div className={c.pillGroup}>
              {interests?.map((interest) => (
                <Pill key={interest.id} text={interest.name} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

type JobOffersCardContentProps = {
  companyJobs?: JobDto[];
};

const JobOffersCardContent: React.FC<JobOffersCardContentProps> = ({
  companyJobs,
}) => {
  if (!companyJobs?.length) {
    return <p className={c.cardContentParagraph}>Nema postavljenih oglasa</p>;
  }
  return (
    <div className={c.jobOffersWrapper}>
      {companyJobs?.map((jobOffer) => (
        <JobOffer
          key={jobOffer.id}
          title={jobOffer.position}
          description={jobOffer.details}
          location={jobOffer.location}
          link={jobOffer.link}
        />
      ))}
    </div>
  );
};

export const CompanyProfile = () => {
  const [, setLocation] = useLocation();
  const [currentModal, setCurrentModal] = useState<keyof typeof FormSteps>();

  const { data: company } = useCompanyGetCurrentPublic();
  const { data: companyJobs } = useJobGetForCompany(company?.id);

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Profile')}</title>
      </Helmet>
      {currentModal !== undefined && (
        <Modal
          form={sponsorForm[currentModal]}
          close={() => setCurrentModal(undefined)}
        />
      )}
      <section className={c.headerInfo}>
        <LayoutSpacing style={{ height: '100%' }}>
          <div className={c.coverImage}>
            <img
              draggable={false}
              src={company?.landingImage || CoverPlaceholder}
              alt='Cover'
            />
          </div>
          <div className={c.basicInfo}>
            <img
              draggable={false}
              src={company?.logoImage || LogoPlaceholder}
              className={c.logoImage}
              style={{
                padding: company?.logoImage ? '45px' : 0,
                objectFit: company?.logoImage ? 'contain' : 'cover',
              }}
            />
            <div className={c.infoContainer}>
              <div className={c.companyName}>
                <h3>{company?.name}</h3>
              </div>
              <CircularButton
                className={c.submitButton}
                onClick={() => setLocation('/sponsor/')}>
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
                buttonText={`${
                  company?.description ? 'Uredite' : 'Dodajte'
                } svoje kratko predstavljanje`}
                onClick={() => setCurrentModal(FormSteps.Description)}>
                <div className={c.cardContentParagraph}>
                  <p>{company?.description || 'Nema opisa'}</p>
                  {company?.opportunitiesDescription && (
                    <p>{company.opportunitiesDescription}</p>
                  )}
                </div>
              </InfoCard>
              <InfoCard
                title='Interesi'
                buttonText={`${
                  company?.interests?.length !== 0 ? 'Uredite' : 'Odaberite'
                } svoje interese`}
                onClick={() => setCurrentModal(FormSteps.Interests)}>
                <InterestsCardContent company={company} />
              </InfoCard>
            </div>
            <div className={c.right}>
              <InfoCard
                title='Oglasi za posao'
                buttonText={`${
                  companyJobs?.length !== 0 ? 'Uredite' : 'Postavite'
                } oglase za posao`}
                onClick={() => setCurrentModal(FormSteps.Jobs)}>
                <JobOffersCardContent companyJobs={companyJobs} />
              </InfoCard>
            </div>
          </div>
        </LayoutSpacing>
      </section>
    </>
  );
};
