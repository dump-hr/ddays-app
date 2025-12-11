import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';
import { useEffect, useMemo, useState } from 'react';

import { useGetApplicants } from '../../api/flyTalks/useGetApplicants';
import { useGetFlyTalks } from '../../api/flyTalks/useGetFlyTaks';
import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import { FlyTalks } from '../../formSteps/Flytalks/Flytalks';
import { Modal } from '../../components/Modal';
import ArrowRightSvg from '../../assets/icons/arrow-right.svg';
import { FormSteps, FormStep } from '../../types/form';
import { sponsorForm } from '../../constants/forms';
import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import InfoMessage from '../../components/InfoMessage';
import WhiteButton from '../../components/WhiteButton';
import { SPONSOR_FLY_TALK_DEADLINE } from '../../constants/dates';
import { formatDatetime } from '../../helpers/date';
import { calculateTimeLeft, formatTimeLeft } from '../../helpers/time';
import c from './FlyTalksPage.module.scss';
import TableRow from './TableRow';

const FlyTalksPage = () => {
  const targetTime = useMemo(() => SPONSOR_FLY_TALK_DEADLINE, []);
  const [modalUser, setModalUser] = useState<UserToCompanyDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Date>(calculateTimeLeft(targetTime));

  function handleOpenModal(user: UserToCompanyDto) {
    setModalUser(user);
    setIsModalOpen(true);
  }

  const { data: applicants = [] } = useGetApplicants();
  const { data: tabs = [] } = useGetFlyTalks();

  const [selectedTab, setSelectedTab] = useState<string>('');

  useEffect(() => {
    if (tabs.length > 0 && !selectedTab) {
      setSelectedTab(tabs[0]);
    }
  }, [tabs, selectedTab]);

  const filteredApplicants = useMemo(() => {
    const datetime = selectedTab;
    return applicants.filter((a) => a.date === datetime);
  }, [applicants, selectedTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const { data: company } = useCompanyGetCurrentPublic();

  const [currentForm, setCurrentForm] = useState<keyof typeof FormSteps | null>(
    null,
  );

  const flyTalkForm: FormStep = {
    title: 'Fly Talks',
    description: 'Predaja do 1. travnja 2025.',
    component: FlyTalks as any,
  };

  return (
    <div className={c.page}>
      {isModalOpen && (
        <FlyTalkUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={modalUser}
          setModalUser={setModalUser}
        />
      )}

      <div className={c.content}>
        {/* Fly Talks card — opens modal on click (do not open automatically) */}
        <div style={{ marginBottom: 24 }}>
          <article
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 8,
              cursor: 'pointer',
            }}
            onClick={() => setCurrentForm(FormSteps.Flytalk)}>
            <div>
              <h3 style={{ margin: 0 }}>Fly Talks</h3>
              <p style={{ margin: 0, opacity: 0.75 }}>
                Predaja do 1. travnja 2025.
              </p>
            </div>
            <img src={ArrowRightSvg} alt='Open' />
          </article>
        </div>

        {currentForm && (
          <Modal
            currentForm={currentForm}
            form={
              currentForm === FormSteps.Flytalk
                ? flyTalkForm
                : (sponsorForm as any)[currentForm]
            }
            close={() => setCurrentForm(null)}
          />
        )}

        {/* Show applicants UI only when company participates in FlyTalks */}
        {!company || company.flytalkParticipation ? (
          <>
            <section className={c.titleSection}>
              <h2 className={c.title}>Fly Talks</h2>
              <p>
                Ukupno odabranih sudionika:{' '}
                {
                  filteredApplicants.filter((applicant) => applicant.selected)
                    .length
                }
                /{filteredApplicants.length}
              </p>
              <div className={c.buttons}>
                {tabs
                  .sort((b, a) => new Date(a).getTime() - new Date(b).getTime())
                  .map((value) => (
                    <WhiteButton
                      variant={selectedTab === value ? 'primary' : 'secondary'}
                      key={value}
                      onClick={() => setSelectedTab(value)}>
                      {formatDatetime(value)}
                    </WhiteButton>
                  ))}
              </div>
            </section>

            {timeLeft.getTime() === 0 ? (
              <InfoMessage message='Odabir sudionika zatvoren.' />
            ) : (
              <InfoMessage
                message={`Odabir sudionika zatvorit će se u četvrtak 22. 5. u 12:00. (${formatTimeLeft(
                  timeLeft,
                )})`}
              />
            )}

            {filteredApplicants.length === 0 ? (
              <p className={c.noApplicants}>Nema prijavljenih sudionika.</p>
            ) : (
              <>
                <table className={c.table}>
                  <thead>
                    <tr>
                      <th>status</th>
                      <th>ime i prezime</th>
                      <th>e-adresa</th>
                      <th>opis i poveznice</th>
                      <th>CV</th>
                      <th>Odabir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplicants
                      .filter((a) => a.selected)
                      .map((applicant) => (
                        <TableRow
                          applicant={applicant}
                          key={applicant.id}
                          handleOpenModal={() => handleOpenModal(applicant)}
                          status='accepted'
                          timeLeft={timeLeft}
                        />
                      ))}
                  </tbody>
                </table>
                {filteredApplicants.filter((applicant) => applicant.selected)
                  .length !== 0 &&
                  filteredApplicants.filter((applicant) => !applicant.selected)
                    .length !== 0 && <hr className={c.break} />}
                <table className={c.table}>
                  <tbody>
                    {filteredApplicants
                      .filter((applicant) => !applicant.selected)
                      .map((applicant) => (
                        <TableRow
                          applicant={applicant}
                          key={applicant.id}
                          handleOpenModal={handleOpenModal}
                          status='rejected'
                          timeLeft={timeLeft}
                        />
                      ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default FlyTalksPage;
