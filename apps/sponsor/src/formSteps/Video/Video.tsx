import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

import { useFetchCompany } from '../../api/useFetchCompany';
import { useUploadVideo } from '../../api/useUploadVideo';
import { FormComponent } from '../../types/form';
import c from './Video.module.scss';

const Video: FormComponent = ({ close }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: uploadVideo, progress } = useUploadVideo();
  const { data: companyData } = useFetchCompany();

  const getVideoMetadata = (file: File): Promise<HTMLVideoElement> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');

      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video);
      };

      video.onerror = (error) => {
        reject(error);
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(async (droppedFiles: File[]) => {
    try {
      const [droppedFile] = droppedFiles;

      if (!droppedFile) {
        return;
      }

      const { duration } = await getVideoMetadata(droppedFile);

      const fileType = droppedFile.type.split('/')[0];

      if (fileType !== 'video' && duration > 20) {
        throw new Error(
          'Uploadani file mora biti video u trajanju maksimalno do 20 sekundi',
        );
      }

      setIsUploading(true);
      uploadVideo(droppedFile);
      setVideoFile(droppedFile);

      toast.success('Video je uspješno prenesen');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemoveVideo = () => {
    try {
      //todo: delete api call
      setVideoFile(null);
      toast.success('Video je uspješno uklonjen');
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
    return !videoFile ? (
      <div {...getRootProps()} className={c.uploadContainer}>
        <input {...getInputProps()} />
        <img src='/upload.svg' alt='Upload' className={c.upload} />
        {!isUploading ? (
          <p className={c.instruction}>
            {isDragActive
              ? 'Droppajte video'
              : 'Prenesite video materijale (max. 75MB)'}
          </p>
        ) : (
          <p className={c.instruction}>Uploadavanje u procesu...{progress}%</p>
        )}
      </div>
    ) : (
      <div className={c.videoContainer}>
        <video controls className={c.video} height={300} width={500}>
          <source src={companyData?.videoUrl} type='video/mp4' />
        </video>
        <span className={c.remove} onClick={handleRemoveVideo}>
          Ukloni
        </span>
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
        Videozapis u trajanju od 15 sekunda, mp4 formata
      </p>

      {getContent()}

      {!!fileRejections.length && (
        <div className={c.error}>Možeš uploadati samo 1 fajl!</div>
      )}

      <div className={c.inputContainer}>
        <button onClick={close} className={c.button}>
          Spremi
        </button>
      </div>
    </div>
  );
};

export default Video;
