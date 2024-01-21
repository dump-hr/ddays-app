import { useDeleteLogo } from '../../api/useDeleteLogo';
import { useGetLoggedCompany } from '../../api/useGetLoggedCompany';
import { useUploadLogo } from '../../api/useUploadLogo';
import { PhotoInput, PhotoInputLabel } from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './LogoUpload.module.scss';

export const LogoUpload: FormComponent = ({ close }) => {
  const { mutate: uploadLogo, isLoading } = useUploadLogo();
  const { mutate: deleteLogo } = useDeleteLogo();
  const { data: companyData } = useGetLoggedCompany();

  const handleUpload = (files: File[]) => {
    uploadLogo(files[0]);
  };

  const handleRemove = () => {
    deleteLogo();
  };

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
      <PhotoInputLabel
        title='Logo tvrtke'
        content='Pozitiv ili negativ u svg formatu'
      />
      <div className={styles.uploadArea}>
        {!isLoading ? (
          <PhotoInput
            label='Prenesite logo u pozitivu'
            displayErrorMessages
            inputConstraints={{
              mimeTypes: ['svg+xml'],
              checkBlackAndWhite: true,
            }}
            height={326}
            fileSrc={companyData?.logoImage}
            handleUpload={handleUpload}
            handleRemove={handleRemove}
          />
        ) : (
          <p className={styles.uploading}>Uploadavanje u procesu...</p>
        )}
      </div>

      <button onClick={close} className={styles.button}>
        Nastavi
      </button>
    </div>
  );
};
