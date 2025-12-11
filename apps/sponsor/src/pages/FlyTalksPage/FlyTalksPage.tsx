import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';
import { ISO } from '@ddays-app/types';
import { useEffect, useMemo, useState } from 'react';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useGetApplicants } from '../../api/flyTalks/useGetApplicants';
import { useGetFlyTalks } from '../../api/flyTalks/useGetFlyTaks';
import ArrowRightSvg from '../../assets/icons/arrow-right.svg';
import StatusErrorSvg from '../../assets/icons/status-error.svg';
import StatusSuccessSvg from '../../assets/icons/status-success.svg';
import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import { Modal } from '../../components/Modal';
import WhiteButton from '../../components/WhiteButton';
import { SPONSOR_FLY_TALK_DEADLINE } from '../../constants/dates';
import { sponsorForm } from '../../constants/forms';
import { FlyTalks } from '../../formSteps/Flytalks/Flytalks';
import { formatDatetime } from '../../helpers/date';
import { calculateTimeLeft, formatTimeLeft } from '../../helpers/time';
import { FormStep, FormSteps, StepStatus } from '../../types/form';
import c from './FlyTalksPage.module.scss';
import TableRow from './TableRow';

const flyTalkForm: FormStep = {
  title: 'Fly Talks',
  description: 'Predaja do 1. travnja 2025.',
  component: FlyTalks,
};

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

const FlyTalksPage = () => {
  const targetTime = useMemo(() => SPONSOR_FLY_TALK_DEADLINE, []);
  const [modalUser, setModalUser] = useState<UserToCompanyDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Date>(calculateTimeLeft(targetTime));
  const [currentForm, setCurrentForm] = useState<keyof typeof FormSteps | null>(
    null,
  );
  const [selectedTab, setSelectedTab] = useState<string>('');

  const { data: applicants = [] } = useGetApplicants();
  const { data: tabs = [] } = useGetFlyTalks();
  const { data: company } = useCompanyGetCurrentPublic();

  useEffect(() => {
    if (tabs.length > 0 && !selectedTab) {
      setSelectedTab(tabs[0]);
    }
  }, [tabs, selectedTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const filteredApplicants = useMemo(() => {
    const datetime = selectedTab;
    return applicants.filter((a) => a.date === datetime);
  }, [applicants, selectedTab]);

  const flytalkStatus = !!company?.flytalkParticipation;

  function handleOpenModal(user: UserToCompanyDto) {
    setModalUser(user);
    setIsModalOpen(true);
  }

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
        {currentForm && (
          <Modal
            currentForm={currentForm}
            form={
              currentForm === FormSteps.Flytalk
                ? flyTalkForm
                : sponsorForm[currentForm]
            }
            close={() => setCurrentForm(null)}
          />
        )}

        <section className={c.titleSection}>
          <h2 className={c.title}>Fly Talks</h2>
          <p>
            Ukupno odabranih sudionika:
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
            message={`${ISO.SPONSOR_FLY_TALK_DEADLINE_STRING} (${formatTimeLeft(
              timeLeft,
            )})`}
          />
        )}

        <div style={{ marginBottom: 24 }}>
          <article
            className={c.item}
            onClick={() => setCurrentForm(FormSteps.Flytalk)}>
            <div className={c.itemInfo}>
              <div>
                <h4>Osobe koje održavaju fly talks</h4>
                <p className={c.itemDescription}>Predaja do 1. travnja 2025.</p>
              </div>
            </div>
            <div className={c.itemAction}>
              {
                statusChips[
                  flytalkStatus ? StepStatus.Good : StepStatus.Pending
                ]
              }
              <img src={ArrowRightSvg} alt='Open' />
            </div>
          </article>
        </div>

        {!company || company.flytalkParticipation ? (
          <>
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
