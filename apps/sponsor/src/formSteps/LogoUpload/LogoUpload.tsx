import {PhotoInput, PhotoInputLabel} from '../../components/PhotoInput';
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
      <PhotoInputLabel title='Logo tvrtke' content='Pozitiv ili negativ u svg formatu' />
      <div className={styles.uploadArea}>
        <PhotoInput
            label='Prenesite logo u pozitivu'
            displayErrorMessages={true}
            inputConstraints={{mimeTypes: ['svg+xml'], checkBlackAndWhite: true}}
            height={326}
        />
      </div>
      
      <button onClick={close} className={styles.button}>
        Nastavi
      </button>
    </div>
  );
};

export default LogoUpload;