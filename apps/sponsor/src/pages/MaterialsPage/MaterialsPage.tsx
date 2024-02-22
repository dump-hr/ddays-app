import { CompanyCategory } from '@ddays-app/types';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';
import ArrowRightSvg from '../../assets/icons/arrow-right.svg';
import StatusErrorSvg from '../../assets/icons/status-error.svg';
import StatusSuccessSvg from '../../assets/icons/status-success.svg';
import InfoMessage from '../../components/InfoMessage';
import { Modal } from '../../components/Modal';
import { sponsorForm } from '../../constants/forms';
import { getPageTitle } from '../../helpers';
import { FormSteps, StepStatus } from '../../types/form';
import c from './MaterialsPage.module.scss';

const statusChips = {
  [StepStatus.Pending]: (
    <div className={c.statusChip}>
      <p>Predaj materijale</p>
    </div>
  ),
  [StepStatus.Good]: (
    <div className={c.statusChip}>
      <img src={StatusSuccessSvg} />
      <p>Uredi</p>
    </div>
  ),
  [StepStatus.Bad]: (
    <div className={c.statusChip}>
      <img src={StatusErrorSvg} />
      <p>Uredi</p>
    </div>
  ),
};

export const MaterialsPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<keyof typeof FormSteps | null>(
    null,
  );

  const { data: company } = useCompanyGetCurrentPublic();
  const { data: jobs } = useJobGetForCompany(company?.id);

  const status = {
    [FormSteps.Description]: !!company?.description,
    [FormSteps.Logo]: !!company?.logoImage,
    [FormSteps.Photos]: !!company?.landingImage,
    [FormSteps.Videos]: !!company?.video,
    [FormSteps.Jobs]: !!jobs?.length,
    [FormSteps.Interests]: !!company?.interests?.length,
    //[FormSteps.SwagBag]: false,
  };

  if (!company) return null;

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Materials')}</title>
      </Helmet>
      <main className={c.page}>
        <div className={c.pageWrapper}>
          <InfoMessage
            style={{ marginBottom: '20px' }}
            message='Molimo vas da materijale predate na vrijeme kako bi vaša objava bila pravovremeno objavljena na društvenim mrežama.'
          />
          <section className={c.itemsWrapper}>
            {Object.entries(sponsorForm)
              .filter(
                ([, fs]) =>
                  !fs.tier ||
                  fs.tier.includes(company.category as CompanyCategory),
              )
              .map(([key, { description, title }], index) => (
                <article
                  className={c.item}
                  onClick={() => {
                    setCurrentForm(key as keyof typeof FormSteps);
                  }}
                  key={key}>
                  <div className={c.itemInfo}>
                    <p className={c.itemIndex}>{index + 1}</p>
                    <div>
                      <h4>{title}</h4>
                      <p className={c.itemDescription}>
                        {typeof description === 'function'
                          ? description(company.category as CompanyCategory)
                          : description}
                      </p>
                    </div>
                  </div>
                  <div className={c.itemAction}>
                    {
                      statusChips[
                        status[key as keyof typeof status]
                          ? StepStatus.Good
                          : StepStatus.Pending
                      ]
                    }
                    <img src={ArrowRightSvg} alt='Open' />
                  </div>
                </article>
              ))}

            {currentForm && (
              <Modal
                currentForm={currentForm}
                form={sponsorForm[currentForm]}
                close={() => {
                  setCurrentForm(null);
                }}
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
};
