import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { FormComponent } from '../../types/form';
import { State } from './types';
import c from './Video.module.scss';

const Video: FormComponent = ({ close, initialSrc = '' }) => {
  const [state, setState] = useState(
    initialSrc ? State.fileDisplay : State.input,
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isFileDirty, setIsFileDirty] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoFile) {
      setState(State.fileDisplay);
    }
  }, [videoFile]);

  useEffect(() => {
    if (!videoRef.current || !videoFile || state === State.input) {
      return;
    }

    const reader = new FileReader();

    videoRef.current.title = videoFile.name;

    reader.onload = (event) => {
      if (!videoRef.current) {
        return;
      }

      const potentialSrc = event.target?.result;

      if (typeof potentialSrc !== 'string') {
        videoRef.current.src = potentialSrc;
      }
    };

    reader.readAsDataURL(videoFile);
  }, [videoFile, state]);

  const onDrop = useCallback((droppedFiles) => {
    const [droppedFile] = droppedFiles;

    if (!droppedFile) {
      return;
    }

    const fileType = droppedFile.type.split('/')[0];

    if (fileType !== 'video') {
      alert('Molimo vas da prenesete video materijale');
      return;
    }

    setVideoFile(droppedFile);

    setIsFileDirty(true);
  }, []);

  const handleRemoveFile = () => {
    setVideoFile(null);
    setState(State.input);

    setIsFileDirty(true);
  };

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      multiple: false,
      disabled: !!videoFile,
    });

  const getContent = () => {
    switch (state) {
      case State.input:
        return (
          <div {...getRootProps()} className={c.uploadContainer}>
            <input {...getInputProps()} />
            <img src='/upload.svg' alt='Upload' className={c.upload} />
            <p className={c.instruction}>
              {isDragActive
                ? 'Droppajte video'
                : 'Prenesite video materijale (max. 50MB)'}
            </p>
          </div>
        );
      case State.fileDisplay:
        return (
          <div className={c.videoContainer}>
            <span className={c.remove} onClick={handleRemoveFile}>
              Ukloni
            </span>

            <video controls ref={videoRef} className={c.video}>
              <source src={videoFile?.name} type='video/mp4' />
            </video>
          </div>
        );
    }
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
