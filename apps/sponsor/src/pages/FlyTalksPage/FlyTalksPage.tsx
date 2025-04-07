import { UserDto } from '@ddays-app/types/src/dto/user';
import { useState } from 'react';

import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import c from './FlyTalksPage.module.scss';
import { applicants1, applicants2 } from './seed';
import TableRow from './TableRow';

const FlyTalksPage = () => {
  const [modalUser, setModalUser] = useState<UserDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal(user: UserDto) {
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
        />
      )}

      <div className={c.content}>
        <section className={c.titleSection}>
          <h2 className={c.title}>Fly Talks</h2>
          <p>
            Ukupno prihvaćenih prijava: {applicants1.length}/
            {applicants1.length + applicants2.length}
          </p>
        </section>
        <InfoMessage message='Odabir sudionika zatvorit će se u srijedu 21. 5. u 12:00.' />
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
