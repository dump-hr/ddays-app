import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyRemoveLandingImage } from '../../api/company/useCompanyRemoveLandingImage';
import { useCompanyUpdateLandingImage } from '../../api/company/useCompanyUpdateLandingImage';
import { PhotoInput, PhotoInputLabel } from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './PhotoUpload.module.scss';

export const PhotoUpload: FormComponent = ({ close }) => {
  const updateLandingImage = useCompanyUpdateLandingImage();
  const removeLandingImage = useCompanyRemoveLandingImage();
  const { data: company } = useCompanyGetCurrentPublic();

  const handleUpload = async (files: File[]) => {
    await updateLandingImage.mutateAsync(files[0]);
  };

  const handleRemove = async () => {
    await removeLandingImage.mutateAsync();
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
        title='Fotografije'
        content='Priložite fotografije koje predstavljaju tvrtku (grupna slika zaposlenika)'
      />
      <div className={styles.uploadArea}>
        <PhotoInput
          label={
            updateLandingImage.isLoading
              ? 'Uploadavanje u procesu...'
              : 'Prenesite fotografije (max. 443px x 326px)'
          }
          isDisabled={updateLandingImage.isLoading}
          displayErrorMessages={true}
          inputConstraints={{
            maxWidth: 443,
            maxHeight: 326,
          }}
          height={326}
          fileSrc={company?.landingImage}
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
