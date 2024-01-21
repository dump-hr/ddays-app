import { useDeleteImage } from '../../api/useDeleteImage';
import { useGetLoggedCompany } from '../../api/useGetLoggedCompany';
import { useUploadImage } from '../../api/useUploadImage';
import { PhotoInput, PhotoInputLabel } from '../../components/PhotoInput';
import { FormComponent } from '../../types/form';
import styles from './PhotoUpload.module.scss';

export const PhotoUpload: FormComponent = ({ close }) => {
  const { mutate: uploadImage, isLoading } = useUploadImage();
  const { mutate: deleteLogo } = useDeleteImage();
  const { data: companyData } = useGetLoggedCompany();

  const handleUpload = (files: File[]) => {
    uploadImage(files[0]);
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
        title='Fotografije'
        content='Priložite fotografije koje predstavljaju tvrtku (grupna slika zaposlenika)'
      />
      <div className={styles.uploadArea}>
        {!isLoading ? (
          <PhotoInput
            label='Prenesite fotografije (max. 443px x 326px)'
            displayErrorMessages={true}
            inputConstraints={{
              maxDimensions: {
                width: 443,
                height: 326,
              },
            }}
            height={326}
            fileSrc={companyData?.landingImage}
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
