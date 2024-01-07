import PhotoInput from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './LogoUpload.module.scss';

const LogoUpload: FormComponent = ({ close }) => {
  return (
    <div>
      <div className={styles.descriptionContainer}>
        <h2 className={styles.descriptionTitle}>
          Predaja sponzorskih materijala
        </h2>
        <div className={styles.descriptionContent}>
          Ovdje možete podijeliti materijale koji će predstaviti vašu tvrtku na
          DUMP Days konferenciji. Molimo vas da pratite upute za predaju i
          formate datoteka kako bi bili jasno vidljivi i prepoznatljivi na svim
          materijalima.
        </div>
      </div>
      <PhotoInput
        label={{
          title: 'Logo tvrtke',
          content: 'Pozitiv i negativ u svg formatu',
          uploadArea: 'Prenesite zip. file (max. 5MB)',
        }}
        errorMessage={{ display: true, content: 'Error Message' }}
        inputConstraints={{ imageCount: 2 }}
      />
      <button onClick={close}>Nastavi</button>
    </div>
  );
};

export default LogoUpload;
