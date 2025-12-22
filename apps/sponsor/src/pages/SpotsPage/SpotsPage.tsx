import { ISO, Tier } from '@ddays-app/types';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCompanyGetAllPublic } from '../../api/company/useCompanyGetAllPublic';
import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { BoothConfirmationPage } from '../../components/BoothConfirmationPage/BoothConfirmationPage';
import ChooseBooth from '../../components/ChooseBooth';
import { Modal } from '../../components/Modal';
import WhiteButton from '../../components/WhiteButton';
import { sponsorForm } from '../../constants/forms';
import { TierLabels } from '../../constants/labels';
import { BoothPlan } from '../../formSteps/BoothPlan';
import useCountdown from '../../hooks/useCountdown';
import c from './SpotsPage.module.scss';

export const SpotsPage = () => {
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const currentCompany = useCompanyGetCurrentPublic();
  const { data: allCompanies } = useCompanyGetAllPublic();
  const { elapsedTime, didFinish } = useCountdown(ISO.SPOTS_OPENING);
  const queryClient = useQueryClient();

  const renderMainContent = () => {
    if (currentCompany.isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            color: 'white',
          }}>
          Loading...
        </div>
      );
    }

    if (currentCompany.data?.booth) {
      return <BoothConfirmationPage name={currentCompany.data.booth} />;
    }

    if (!didFinish) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            color: 'white',
          }}>
          Biranje mjesta kreće za {elapsedTime}
        </div>
      );
    }

    return <ChooseBooth />;
  };

  return (
    <div className={c.page}>
      {renderMainContent()}

      <div className={c.pageWrapper}>
        <div className={c.contentWrapper}>
          <h4 className={c.title}>Plan štanda</h4>
          <p className={c.subtitle}>
            Plan štanda je kratak opis sadržaja Vašeg štanda
          </p>
          {currentCompany.data?.boothPlan && (
            <div className={c.boothPlanList}>
              {currentCompany.data.boothPlan}
            </div>
          )}
          <WhiteButton
            className={c.button}
            onClick={() => {
              setCurrentForm('BoothPlan');
            }}>
            Dodaj plan štanda
          </WhiteButton>
        </div>

        {allCompanies && allCompanies.length > 0 && (
          <div className={c.allBoothPlansGrid}>
            <h4>TIER SPONZORSTVA</h4>
            <h4>TVRTKA</h4>
            <h4>PLAN ŠTANDA</h4>
            {allCompanies
              .filter((company) => company.boothPlan)
              .map((company) => (
                <div key={company.id} style={{ display: 'contents' }}>
                  <p>
                    {company.category
                      ? (TierLabels[company.category as unknown as Tier] ??
                        company.category)
                      : '-'}
                  </p>
                  <p>{company.name}</p>
                  <p>{company.boothPlan}</p>
                </div>
              ))}
          </div>
        )}

        {currentForm && (
          <Modal
            currentForm={'BoothPlan'}
            form={{
              ...sponsorForm['BoothPlan'],
              title: 'Dodaj plan štanda',
              component: BoothPlan,
            }}
            close={() => {
              queryClient.invalidateQueries();
              setCurrentForm(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
