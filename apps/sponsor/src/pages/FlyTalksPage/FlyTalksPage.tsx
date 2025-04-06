import InfoMessage from '../../components/InfoMessage';
import c from './FlyTalksPage.module.scss';

const FlyTalksPage = () => {
  return (
    <div className={c.page}>
      <div className={c.content}>
        <section className={c.titleSection}>
          <h2 className={c.title}>Fly Talks</h2>
          <p>Ukupno prihvaćenih prijava: 3/25</p>
        </section>
        <InfoMessage message='Odabir sudionika zatvorit će se u srijedu 21. 5. u 12:00.' />
        <table>
          <thead>
            <tr>
              <th>status</th>
              <th>ime i prezime</th>
              <th>e-adresa</th>
              <th>godina rođenja</th>
              <th>CV</th>
              <th>Odabir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Ivan</td>
              <td>Ivan.gmail.com</td>
              <td>2002.</td>
              <td>
                <button>ok</button>
              </td>
              <td>
                <button>ODABRI</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlyTalksPage;
