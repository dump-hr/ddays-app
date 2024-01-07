import { useDropzone } from 'react-dropzone';

import { FormComponent } from '../../types/form';
import c from './Video.module.scss';

const Video: FormComponent = ({ close }) => {
  //   const onDrop = useCallback((acceptedFiles) => {}, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

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

      {acceptedFiles.length === 0 && (
        <div {...getRootProps()} className={c.uploadContainer}>
          <input {...getInputProps()} />
          <img src='/upload.svg' alt='Upload' className={c.upload} />
          <p className={c.instruction}>
            Prenesite video materijale (max. 50MB)
          </p>
        </div>
      )}
      {acceptedFiles.length > 0 && (
        <aside>
          <h4>Files</h4>
          {/* <ul>{acceptedFiles[0].name}</ul> */}
        </aside>
      )}
      <div className={c.inputContainer}>
        <button onClick={close} className={c.button}>
          Nastavi
        </button>
      </div>
    </div>
  );
};

export default Video;
