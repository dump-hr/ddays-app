import { UserDto } from '@ddays-app/types/src/dto/user';
import { useState } from 'react';

import CheckIcon from '../../assets/icons/check.svg';
import XIcon from '../../assets/icons/x.svg';
import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import WhiteButton from '../../components/WhiteButton';
import c from './FlyTalksPage.module.scss';
import { applicants1, applicants2 } from './seed';

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
              <tr key={i}>
                <td>
                  <img src={CheckIcon} />
                </td>
                <td>
                  {applicant.firstName} {applicant.lastName}
                </td>
                <td>{applicant.email}</td>
                <td>
                  <p onClick={() => handleOpenModal(applicant)}>
                    Pregledaj detalje
                  </p>
                </td>
                <td>
                  <WhiteButton variant='secondary'>Pregledaj CV</WhiteButton>
                </td>
                <td>
                  <WhiteButton variant='primary'>Ukloni odabir</WhiteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applicants1.length !== 0 && applicants2.length !== 0 && (
          <hr className={c.break} />
        )}
        <table className={c.table}>
          <tbody>
            {applicants2.map((applicant, i) => (
              <tr key={i}>
                <td>
                  <img src={XIcon} />
                </td>
                <td>
                  {applicant.firstName} {applicant.lastName}
                </td>
                <td>{applicant.email}</td>
                <td>
                  <p>Pregledaj detalje</p>
                </td>
                <td>
                  <WhiteButton variant='secondary'>Pregledaj CV</WhiteButton>
                </td>
                <td>
                  <WhiteButton variant='secondary'>Odaberi</WhiteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlyTalksPage;
