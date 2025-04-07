import { UserDto } from '@ddays-app/types/src/dto/user';
import { useEffect, useMemo, useState } from 'react';

import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import WhiteButton from '../../components/WhiteButton';
import { calculateTimeLeft } from '../../helpers/time';
import c from './FlyTalksPage.module.scss';
import { applicants1, applicants2 } from './seed';
import TableRow from './TableRow';

const FlyTalksPage = () => {
  const tabs = ['Grupa 1', 'Grupa 2'];
  const targetTime = useMemo(() => new Date('2025-05-21T12:00:00'), []);

  const [modalUser, setModalUser] = useState<UserDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [timeLeft, setTimeLeft] = useState<Date>(calculateTimeLeft(targetTime));

  function handleOpenModal(user: UserDto) {
    setModalUser(user);
    setIsModalOpen(true);
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
        />
      )}

      <div className={c.content}>
        <section className={c.titleSection}>
          <h2 className={c.title}>Fly Talks</h2>
          <p>
            Ukupno odabranih sudionika: {applicants1.length}/
            {applicants1.length + applicants2.length}
          </p>
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
        </section>
        <InfoMessage
          message={`Odabir sudionika zatvorit će se u srijedu 21. 5. u 12:00 (${Math.floor(
            timeLeft.getTime() / (1000 * 60 * 60 * 24),
          )}d ${timeLeft.getUTCHours()}h ${timeLeft.getUTCMinutes()}m ${timeLeft.getUTCSeconds()}s).`}
        />
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
                handleOpenModal={handleOpenModal}
                status='accepted'
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlyTalksPage;
