import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyRemoveLandingImage } from '../../api/company/useCompanyRemoveLandingImage';
import { useCompanyRemoveLandingImageCompanyCulture } from '../../api/company/useCompanyRemoveLandingImageCompanyCulture';
import { useCompanyUpdateLandingImage } from '../../api/company/useCompanyUpdateLandingImage';
import { useCompanyUpdateLandingImageCompanyCulture } from '../../api/company/useCompanyUpdateLandingImageCompanyCulture';
import { PhotoInput, PhotoInputLabel } from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './PhotoUpload.module.scss';

export const PhotoUpload: FormComponent = ({ close }) => {
  const updateLandingImage = useCompanyUpdateLandingImage();
  const removeLandingImage = useCompanyRemoveLandingImage();
  const updateLandingImageCompanyCulture =
    useCompanyUpdateLandingImageCompanyCulture();
  const removeLandingImageCompanyCulture =
    useCompanyRemoveLandingImageCompanyCulture();

  const { data: company } = useCompanyGetCurrentPublic();

  const handleUpload = async (files: File[]) => {
    await updateLandingImage.mutateAsync(files[0]);
  };

  const handleRemove = async () => {
    await removeLandingImage.mutateAsync();
  };

  const handleUploadCompanyCulture = async (files: File[]) => {
    await updateLandingImageCompanyCulture.mutateAsync(files[0]);
  };

  const handleRemoveCompanyCulture = async () => {
    await removeLandingImageCompanyCulture.mutateAsync();
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
              ? 'Prenošenje u tijeku...'
              : 'Prenesite fotografije (max. 1920px x 1080px)'
          }
          isDisabled={updateLandingImage.isLoading}
          displayErrorMessages={true}
          inputConstraints={{
            maxWidth: 1920,
            maxHeight: 1080,
          }}
          height={326}
          fileSrc={company?.landingImage}
          handleUpload={handleUpload}
          handleRemove={handleRemove}
        />

        {company?.category === 'gold' && (
          <PhotoInput
            label={
              updateLandingImageCompanyCulture.isLoading
                ? 'Uploadanje u procesu...'
                : 'Prenesite fotografije (max. 1920px x 1080px)'
            }
            isDisabled={updateLandingImageCompanyCulture.isLoading}
            displayErrorMessages={true}
            inputConstraints={{
              maxWidth: 1920,
              maxHeight: 1080,
            }}
            height={326}
            fileSrc={company?.landingImageCompanyCulture}
            handleUpload={handleUploadCompanyCulture}
            handleRemove={handleRemoveCompanyCulture}
          />
        )}
      </div>

      <button onClick={close} className={styles.button}>
        Spremi
      </button>
    </div>
  );
};
