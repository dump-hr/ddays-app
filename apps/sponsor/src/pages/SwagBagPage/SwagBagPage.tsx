import { type FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import InfoMessage from '../../components/InfoMessage';
import { Modal } from '../../components/Modal';
import WhiteButton from '../../components/WhiteButton';
import { sponsorForm } from '../../constants/forms';
import { getPageTitle } from '../../helpers';
import c from './SwagBagPage.module.scss';

export const SwagBagPage: FC = () => {
  const [currentForm, setCurrentForm] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>{getPageTitle('Materials')}</title>
      </Helmet>
      <main className={c.page}>
        <div className={c.pageWrapper}>
          <InfoMessage
            style={{ marginBottom: '20px' }}
            message='Please predajte preostale materijale do 15.4. nesto nesto'
          />
          <div className={c.contentWrapper}>
            <h4 className={c.title}>Swag bag materijali</h4>
            <p className={c.subtitle}>
              Swag bag materijali podrazumijevaju Vaš merch koji će biti
              podijeljen unutar naših swag bagova (ovo san izmislila bzvz je)
            </p>
            <WhiteButton
              className={c.button}
              onClick={() => {
                setCurrentForm('Jobs');
              }}>
              Dodaj swag bag materijale
            </WhiteButton>
          </div>
          {currentForm && (
            <Modal
              currentForm={'Jobs'}
              form={sponsorForm['Jobs']}
              close={() => {
                setCurrentForm(null);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
};
