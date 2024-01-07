import { useState } from 'react';

import Modal from '../../components/Modal';
import { forms } from '../../constants/forms';
import { FormStatus } from '../../types';
import c from './MaterialsPage.module.scss';

const statusChips = {
  [FormStatus.Pending]: (
    <div className={c.statusChip}>
      <p>Predaj materijale</p>
    </div>
  ),
  [FormStatus.Good]: (
    <div className={c.statusChip}>
      <img src='/status-success.svg' />
      <p>Uredi</p>
    </div>
  ),
  [FormStatus.Bad]: (
    <div className={c.statusChip}>
      <img src='/status-error.svg' />
      <p>Uredi</p>
    </div>
  ),
};

const initialState = {
  statuses: Array(forms.length).fill(FormStatus.Pending),
};

const MaterialsPage: React.FC = () => {
  const [statuses, setStatuses] = useState<FormStatus[]>(initialState.statuses); //BE
  const [currentForm, setCurrentForm] = useState<number | null>(0);

  return (
    <main className={c.page}>
      <div className={c.pageWrapper}>
        <section className={c.itemsWrapper}>
          {forms.map(({ description, title }, index) => (
            <article
              className={c.item}
              onClick={() => setCurrentForm(index)}
              key={index}>
              <div className={c.itemInfo}>
                <p className={c.itemIndex}>{index + 1}</p>
                <div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </div>
              <div className={c.itemAction}>
                {statusChips[statuses[index]]}
                <img src='/arrow-right.svg' alt='Open' />
              </div>
            </article>
          ))}
          {currentForm !== null && (
            <Modal
              form={forms[currentForm]}
              close={() => setCurrentForm(null)}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default MaterialsPage;
