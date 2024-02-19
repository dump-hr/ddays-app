import { CompanyCategory } from '@ddays-app/types';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyRemoveVideo } from '../../api/company/useCompanyRemoveVideo';
import { useCompanyUpdateVideo } from '../../api/company/useCompanyUpdateVideo';
import UploadSvg from '../../assets/icons/upload.svg';
import { getVideoMetadata } from '../../helpers/file';
import { FormComponent } from '../../types/form';
import c from './Video.module.scss';

const getMaxVideoDurationPerTier = (category: CompanyCategory) => {
  switch (category) {
    case CompanyCategory.Bronze:
      return 10;
    case CompanyCategory.Silver:
      return 20;
    case CompanyCategory.Gold:
      return 30;
    default:
      return 0;
  }
};

const maxVideoDurationTolerance = 0.1;

export const Video: FormComponent = ({ close }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const updateVideo = useCompanyUpdateVideo();
  const removeVideo = useCompanyRemoveVideo();

  const { data: company } = useCompanyGetCurrentPublic();

  const maxDuration = getMaxVideoDurationPerTier(
    company?.category as CompanyCategory,
  );

  const onDrop = async (droppedFiles: File[]) => {
    try {
      const [droppedFile] = droppedFiles;

      if (!droppedFile) {
        return;
      }

      const { duration } = await getVideoMetadata(droppedFile);

      if (duration > maxDuration + maxVideoDurationTolerance) {
        toast.error(
          `Uploadani file mora biti video u trajanju maksimalno do ${maxDuration} sekundi`,
        );
        return;
      }

      await updateVideo.mutateAsync(droppedFile);
      setVideoFile(droppedFile);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleRemoveVideo = async () => {
    try {
      await removeVideo.mutateAsync();
      setVideoFile(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      multiple: false,
      disabled: !!videoFile,
    });

  const getContent = () => {
    if (company?.video) {
      return (
        <div className={c.videoContainer}>
          <video controls className={c.video} height={300} width={500}>
            <source src={company?.video} type='video/mp4' />
          </video>
          <span className={c.remove} onClick={handleRemoveVideo}>
            Ukloni
          </span>
        </div>
      );
    }
    return (
      <div {...getRootProps()} className={c.uploadContainer}>
        <input {...getInputProps()} />
        <img src={UploadSvg} alt='Upload' className={c.upload} />
        {!updateVideo.isLoading ? (
          <p className={c.instruction}>
            {isDragActive
              ? 'Droppajte video'
              : 'Prenesite video materijale (max. 75MB)'}
          </p>
        ) : (
          <p className={c.instruction}>Uploadavanje u procesu...</p>
        )}
      </div>
    );
  };

  return (
    <div className={c.container}>
      <h1 className={c.title}>Predaja sponzorskih materijala</h1>
      <p className={c.description}>
        Ovdje možete podijeliti materijale koji će predstaviti vašu tvrtku na
        DUMP Days konferenciji. Molimo vas da pratite upute za predaju i formate
        datoteka kako bi bili jasno vidljivi i prepoznatljivi na svim
        materijalima.
      </p>
      <h2 className={c.subtitle}>Videozapis</h2>
      <p className={c.description}>
        Videozapis u trajanju od {maxDuration} sekunda, mp4 formata
      </p>

      {getContent()}

      {!!fileRejections.length && (
        <div className={c.error}>Možeš uploadati samo 1 datoteku!</div>
      )}

      <div className={c.inputContainer}>
        <button onClick={close} className={c.button}>
          Spremi
        </button>
      </div>
    </div>
  );
};
