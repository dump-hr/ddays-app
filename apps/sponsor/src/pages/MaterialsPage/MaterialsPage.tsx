import { FormSteps, StepStatus } from '@ddays-app/types';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { useGetSponsorFormStatus } from '../../api/useGetSponsorFormStatus';
import ArrowRightSvg from '../../assets/arrow-right.svg';
import StatusErrorSvg from '../../assets/status-error.svg';
import StatusSuccessSvg from '../../assets/status-success.svg';
import Modal from '../../components/Modal';
import { sponsorForm } from '../../constants/forms';
import { getPageTitle } from '../../helpers';
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

  const { data } = useGetSponsorFormStatus();

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Materials')}</title>
      </Helmet>
      <main className={c.page}>
        <div className={c.pageWrapper}>
          <section className={c.itemsWrapper}>
            {Object.entries(sponsorForm).map(
              ([key, { description, title }], index) => (
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
                      <p>{description}</p>
                    </div>
                  </div>
                  <div className={c.itemAction}>
                    {data?.status &&
                      statusChips[data?.status[key as keyof typeof FormSteps]]}
                    <img src={ArrowRightSvg} alt='Open' />
                  </div>
                </article>
              ),
            )}

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
