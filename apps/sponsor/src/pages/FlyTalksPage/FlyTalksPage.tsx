import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';
import { useEffect, useMemo, useState } from 'react';

import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import WhiteButton from '../../components/WhiteButton';
import { SPONSOR_FLY_TALK_DEADLINE } from '../../constants/dates';
import { calculateTimeLeft, formatTimeLeft } from '../../helpers/time';
import c from './FlyTalksPage.module.scss';
import TableRow from './TableRow';
import { useGetApplicants } from '../../api/flyTalks/useGetApplicants';

const FlyTalksPage = () => {
  const tabs = ['Grupa 1', 'Grupa 2'];
  const hasOnlyOneGroup = false; // Stavit uvjet npr. je li zlatni. Druga opcija napunit array sa koliko ima grupa u bazi.
  const targetTime = useMemo(() => SPONSOR_FLY_TALK_DEADLINE, []);

  const [modalUser, setModalUser] = useState<UserToCompanyDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalButtonText, setModalButtonText] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [timeLeft, setTimeLeft] = useState<Date>(calculateTimeLeft(targetTime));

  function handleOpenModal(user: UserToCompanyDto, modalButtonText?: string) {
    setModalUser(user);
    setIsModalOpen(true);
    setModalButtonText(modalButtonText || 'Odaberi');
  }

  const { data: applicants = [] } = useGetApplicants();

  const filteredApplicants = useMemo(() => {
    if (selectedTab === 'Grupa 1')
      return applicants.filter((applicant) => applicant.date === '23');
    if (selectedTab === 'Grupa 2')
      return applicants.filter((applicant) => applicant.date === '24');
    return [];
  }, [selectedTab, applicants]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className={c.page}>
      {isModalOpen && (
        <FlyTalkUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={modalUser}
          modalButtonText={modalButtonText}
        />
      )}

      <div className={c.content}>
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
          {!hasOnlyOneGroup && (
            <div className={c.buttons}>
              {tabs.map((value) => (
                <WhiteButton
                  variant={selectedTab === value ? 'primary' : 'secondary'}
                  key={value}
                  onClick={() => setSelectedTab(value)}>
                  {value}
                </WhiteButton>
              ))}
            </div>
          )}
        </section>
        {timeLeft.getTime() === 0 ? (
          <InfoMessage message='Odabir sudionika zatvoren.' />
        ) : (
          <InfoMessage
            message={`Odabir sudionika zatvorit će se u srijedu 21. 5. u 12:00. (${formatTimeLeft(
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
                  .map((applicant, i) => (
                    <TableRow
                      applicant={applicant}
                      key={i}
                      handleOpenModal={() =>
                        handleOpenModal(applicant, 'Ukloni odabir')
                      }
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
                  .map((applicant, i) => (
                    <TableRow
                      applicant={applicant}
                      key={i}
                      handleOpenModal={handleOpenModal}
                      status='rejected'
                      timeLeft={timeLeft}
                    />
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default FlyTalksPage;
