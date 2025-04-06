import clsx from 'clsx';

import CheckIcon from '../../assets/icons/check.svg';
import XIcon from '../../assets/icons/x.svg';
import InfoMessage from '../../components/InfoMessage';
import c from './FlyTalksPage.module.scss';
import { applicants1, applicants2 } from './seed';

const FlyTalksPage = () => {
  return (
    <div className={c.page}>
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
                  <p>Pregledaj detalje</p>
                </td>
                <td>
                  <button className={c.button}>Pregledaj CV</button>
                </td>
                <td>
                  <button className={clsx(c.button, c.white)}>
                    Ukloni odabir
                  </button>
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
                  <button className={c.button}>Pregledaj CV</button>
                </td>
                <td>
                  <button className={c.button}>Odaberi</button>
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
