import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyRemoveBookOfStandards } from '../../api/company/useCompanyRemoveBookOfStandards';
import { useCompanyRemoveLogoImage } from '../../api/company/useCompanyRemoveLogoImage';
import { useCompanyUpdateBookOfStandards } from '../../api/company/useCompanyUpdateBookOfStandards';
import { useCompanyUpdateLogoImage } from '../../api/company/useCompanyUpdateLogoImage';
import { PdfInput } from '../../components/PdfUpload/PdfInput';
import { PhotoInput, PhotoInputLabel } from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './LogoUpload.module.scss';

export const LogoUpload: FormComponent = ({ close }) => {
  const updateLogoImage = useCompanyUpdateLogoImage();
  const removeLogoImage = useCompanyRemoveLogoImage();
  const { data: company } = useCompanyGetCurrentPublic();
  const updateBookOfStandards = useCompanyUpdateBookOfStandards();
  const removeBookOfStandards = useCompanyRemoveBookOfStandards();

  const handleUpload = async (files: File[]) => {
    await updateLogoImage.mutateAsync(files[0]);
  };

  const handleRemove = async () => {
    await removeLogoImage.mutateAsync();
  };

  const handleUploadBookOfStandards = async (files: File[]) => {
    await updateBookOfStandards.mutateAsync(files[0]);
  };

  const handleRemoveBookOfStandards = async () => {
    await removeBookOfStandards.mutateAsync();
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
        content='Pozitiv ili negativ u svg formatu (crni ili bijeli logo)'
      />
      <div className={styles.uploadArea}>
        <PhotoInput
          label={
            updateLogoImage.isLoading
              ? 'Uploadavanje u procesu...'
              : 'Prenesite logo u pozitivu ili negativu'
          }
          displayErrorMessages
          inputConstraints={{
            mimeTypes: ['svg+xml'],
          }}
          isDisabled={updateLogoImage.isLoading}
          height={326}
          fileSrc={company?.logoImage}
          handleUpload={handleUpload}
          handleRemove={handleRemove}
        />
        <PhotoInputLabel
          title='Knjiga standarda'
          content='Knjiga standarda je dokument koji sadrži uspostavljene specifikacije, smjernice ili zahtjeve za branding'
        />
        <PdfInput
          label={
            updateBookOfStandards.isLoading
              ? 'Uploadanje u procesu...'
              : 'Prinesite knjigu standarda (PDF)'
          }
          isDisabled={false}
          fileSrc={company?.bookOfStandards}
          height={326}
          handleUpload={handleUploadBookOfStandards}
          handleRemove={handleRemoveBookOfStandards}
        />
      </div>

      <button onClick={close} className={styles.button}>
        Spremi
      </button>
    </div>
  );
};
