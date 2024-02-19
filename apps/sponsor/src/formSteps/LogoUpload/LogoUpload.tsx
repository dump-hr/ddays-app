import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyRemoveLogoImage } from '../../api/company/useCompanyRemoveLogoImage';
import { useCompanyUpdateLogoImage } from '../../api/company/useCompanyUpdateLogoImage';
import { PhotoInput, PhotoInputLabel } from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './LogoUpload.module.scss';

export const LogoUpload: FormComponent = ({ close }) => {
  const updateLogoImage = useCompanyUpdateLogoImage();
  const removeLogoImage = useCompanyRemoveLogoImage();
  const { data: company } = useCompanyGetCurrentPublic();

  const handleUpload = async (files: File[]) => {
    await updateLogoImage.mutateAsync(files[0]);
  };

  const handleRemove = async () => {
    await removeLogoImage.mutateAsync();
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
        <PhotoInput
          label={
            updateLogoImage.isLoading
              ? 'Uploadavanje u procesu...'
              : 'Prenesite logo u pozitivu'
          }
          displayErrorMessages
          inputConstraints={{
            mimeTypes: ['svg+xml'],
            checkBlackAndWhite: true,
          }}
          isDisabled={updateLogoImage.isLoading}
          height={326}
          fileSrc={company?.logoImage}
          handleUpload={handleUpload}
          handleRemove={handleRemove}
        />
      </div>

      <button onClick={close} className={styles.button}>
        Spremi
      </button>
    </div>
  );
};
