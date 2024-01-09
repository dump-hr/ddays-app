import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';

import styles from './PhotoInput.module.scss';
import sprite from '../../../public/sprite.svg';

type PhotoInputProps = {
  crop?: boolean;
  label?: string;
  errorMessage?: {
    display: boolean;
    content: string;
  };
  inputConstraints?: {
    imageType?: string;
    aspectRatio?: number;
    mimeTypes?: string[];
    maxFileSize?: number;
    maxDimensions?: {
      width: number;
      height: number;
    };
  };
  height?: number;
};

interface FileWithPreview extends File {
    preview?: string;
}

const PhotoInput: React.FC<PhotoInputProps> = ({
  label,
  errorMessage,
  inputConstraints,
  height=362,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: inputConstraints?.mimeTypes?.reduce((acc, type) => ({ ...acc, [`image/${type}`]: [] }), {}) || { 'image/*': [] },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
      },
    });

  const thumbs = files.map((file) => (
    <div className={styles.thumb}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.image}
          onLoad={() => {
            if (file.preview) {
                URL.revokeObjectURL(file?.preview);
            }
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => {
        if(file.preview) {
            URL.revokeObjectURL(file.preview);
        }
    });
  }, []);

  return (
    <div className={styles.inputArea} style={{height: `${height}px`}}>
      <div className={styles.inputAreaContainer} style={{height: `${height}px`}}>
        <label className={styles.inputAreaLabel}>
          {!acceptedFiles.length && (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={styles.inputFieldLabel}>
                <svg height='21px' width='24px'>
                  <use href={`${sprite}#upload-materials`} />
                </svg>
                <p>{label}</p>
              </div>
            </div>
          )}
          <aside className={styles.thumbsContainer}>
            {thumbs}
          </aside>
        </label>
      </div>
    </div>
  );
};

export default PhotoInput;
