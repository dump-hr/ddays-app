import { ISO, Tier } from '@ddays-app/types';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { useCompanyGetBoothPlans } from '../../api/company/useCompanyGetBoothPlans';
import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import ChooseBooth from '../../components/ChooseBooth';
import { Modal } from '../../components/Modal';
import WhiteButton from '../../components/WhiteButton';
import { sponsorForm } from '../../constants/forms';
import { TierLabels } from '../../constants/labels';
import useCountdown from '../../hooks/useCountdown';
import { FormSteps } from '../../types/form';
import c from './SpotsPage.module.scss';

export const SpotsPage = () => {
  const [currentForm, setCurrentForm] = useState<FormSteps | null>(null);
  const currentCompany = useCompanyGetCurrentPublic();
  const { data: allCompanies = [], isLoading } = useCompanyGetBoothPlans();
  const { elapsedTime, didFinish } = useCountdown(ISO.SPOTS_OPENING);
  const queryClient = useQueryClient();

  const renderMainContent = () => {
    if (currentCompany.isLoading || isLoading) {
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

    if (!didFinish && !currentCompany.data?.booth) {
      return (
        <div className={c.countdownSection}>
          <span className={c.countdownText}>
            Biranje mjesta kreće za{' '}
          </span>
          <span className={c.countdownTimer}>{elapsedTime}</span>
        </div>
      );
    }

    return <ChooseBooth confirmedBooth={currentCompany.data?.booth} />;
  };

  return (
    <div className={c.page}>
      <div className={c.pageWrapper}>
        {renderMainContent()}

        <div className={c.contentWrapper}>
          <h4 className={c.title}>Potrebni materijali za štand</h4>
          <p className={c.subtitle}>
            Ovdje možete tražiti neke materijale koje želite da Vam DUMP dostavi
            za rad
          </p>
          {(() => {
            try {
              const items = currentCompany.data?.equipment
                ? JSON.parse(currentCompany.data.equipment)
                : [];
              if (items.length > 0) {
                return (
                  <div className={c.boothPlanList}>
                    {items.map(
                      (item: { name: string; quantity: number }, i: number) => (
                        <div key={i}>
                          {item.quantity} x {item.name}
                        </div>
                      ),
                    )}
                  </div>
                );
              }
            } catch (e) {
              return null;
            }
          })()}
          <WhiteButton
            className={c.button}
            onClick={() => {
              setCurrentForm(FormSteps.BoothEquipment);
            }}>
            Dodaj materijale
          </WhiteButton>

          <h4 className={c.title} style={{ marginTop: '48px' }}>
            Plan štanda
          </h4>
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
              setCurrentForm(FormSteps.BoothPlan);
            }}>
            Dodaj plan štanda
          </WhiteButton>
        </div>

        {allCompanies && allCompanies.length > 0 && (
          <div className={c.allBoothPlansGrid}>
            <h4>TIER SPONZORSTVA</h4>
            <h4>TVRTKA</h4>
            <h4>PLAN ŠTANDA</h4>
            {allCompanies.map((company) => (
              <div key={company.id} style={{ display: 'contents' }}>
                <p>
                  {company.category
                    ? (TierLabels[company.category as unknown as Tier] ??
                      company.category)
                    : '-'}
                </p>
                <p>{company.name}</p>
                <p>{company.boothPlan || 'Nema opisa'}</p>
              </div>
            ))}
          </div>
        )}

        {currentForm && (
          <Modal
            currentForm={currentForm}
            form={{
              ...sponsorForm[currentForm],
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
