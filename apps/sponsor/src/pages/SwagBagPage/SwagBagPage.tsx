import { type FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useSwagBagGetByCompany } from '../../api/swagBag/useSwagBagGetByCompany';
import InfoMessage from '../../components/InfoMessage';
import { Modal } from '../../components/Modal';
import WhiteButton from '../../components/WhiteButton';
import { sponsorForm } from '../../constants/forms';
import { SwagBag } from '../../formSteps/SwagBag';
import { getPageTitle } from '../../helpers';
import c from './SwagBagPage.module.scss';

export const SwagBagPage: FC = () => {
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const { data: company } = useCompanyGetCurrentPublic();
  const { data: companySwagBags } = useSwagBagGetByCompany(company?.id);

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
            {(companySwagBags ?? []).length > 0 && (
              <div className={c.swagBagList}>
                {companySwagBags?.map((swagBag) => (
                  <div key={swagBag.id} className={c.swagBagItem}>
                    <span>
                      {swagBag.name} x {swagBag.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
              form={{
                ...sponsorForm['Jobs'],
                title: 'Dodaj swag bag materijale',
                component: SwagBag,
              }}
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
