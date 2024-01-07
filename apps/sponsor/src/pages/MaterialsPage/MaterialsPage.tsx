import { useState } from 'react';

import { useGetSponsorFormStatus } from '../../api/useGetSponsorFormStatus';
import Modal from '../../components/Modal';
import { sponsorForm } from '../../constants/forms';
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
      <img src='/status-success.svg' />
      <p>Uredi</p>
    </div>
  ),
  [StepStatus.Bad]: (
    <div className={c.statusChip}>
      <img src='/status-error.svg' />
      <p>Uredi</p>
    </div>
  ),
};

const MaterialsPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<keyof typeof FormSteps | null>(
    null,
  );

  const { data } = useGetSponsorFormStatus();

  return (
    <main className={c.page}>
      <div className={c.pageWrapper}>
        <section className={c.itemsWrapper}>
          {Object.entries(sponsorForm).map(
            ([key, { description, title }], index) => (
              <article
                className={c.item}
                onClick={() => setCurrentForm(key as keyof typeof FormSteps)}
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
                  <img src='/arrow-right.svg' alt='Open' />
                </div>
              </article>
            ),
          )}
          {currentForm !== null && (
            <Modal
              form={sponsorForm[currentForm]}
              close={() => setCurrentForm(null)}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default MaterialsPage;
