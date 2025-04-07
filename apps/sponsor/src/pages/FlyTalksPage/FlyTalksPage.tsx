import { UserDto } from '@ddays-app/types/src/dto/user';
import { useEffect, useMemo, useState } from 'react';

import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import WhiteButton from '../../components/WhiteButton';
import { SPONSOR_FLY_TALK_DEADLINE } from '../../constants/dates';
import { calculateTimeLeft, formatTimeLeft } from '../../helpers/time';
import c from './FlyTalksPage.module.scss';
import { applicants1, applicants2 } from './seed';
import TableRow from './TableRow';

const FlyTalksPage = () => {
  const tabs = ['Grupa 1', 'Grupa 2'];
  const hasOnlyOneGroup = false; // Stavit uvjet npr. je li zlatni. Druga opcija napunit array sa koliko ima grupa u bazi.
  const targetTime = useMemo(() => SPONSOR_FLY_TALK_DEADLINE, []);

  const [modalUser, setModalUser] = useState<UserDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalButtonText, setModalButtonText] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [timeLeft, setTimeLeft] = useState<Date>(calculateTimeLeft(targetTime));

  function handleOpenModal(user: UserDto, modalButtonText?: string) {
    setModalUser(user);
    setIsModalOpen(true);
    setModalButtonText(modalButtonText || 'Odaberi');
  }

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
            Ukupno odabranih sudionika: {applicants1.length}/
            {applicants1.length + applicants2.length}
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
            {applicants1.map((applicant, i) => (
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
        {applicants1.length !== 0 && applicants2.length !== 0 && (
          <hr className={c.break} />
        )}
        <table className={c.table}>
          <tbody>
            {applicants2.map((applicant, i) => (
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
      </div>
    </div>
  );
};

export default FlyTalksPage;
