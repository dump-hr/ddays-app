import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import sprite from '../../../public/sprite.svg';
import { Message } from '../../constants/messages';
import { photoHelper } from '../../helpers/photoHelper';
import { ErrorMessage } from '.';
import styles from './PhotoInput.module.scss';

type PhotoInputProps = {
  label?: string;
  displayErrorMessages?: boolean;
  inputConstraints?: {
    mimeTypes?: string[];
    maxDimensions?: {
      width: number;
      height: number;
    };
    checkBlackAndWhite?: boolean;
  };
  height?: number;
};

interface FileWithPreview extends File {
  preview?: string;
}

const PhotoInput: React.FC<PhotoInputProps> = ({
  label,
  displayErrorMessages = false,
  inputConstraints,
  height = 362,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isBlackAndWhite, setIsBlackAndWhite] = useState<boolean | null>(null);
  const [isWithinDimensions, setIsWithinDimensions] = useState<boolean | null>(
    null,
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: inputConstraints?.mimeTypes?.reduce(
      (acc, type) => ({ ...acc, [`image/${type}`]: [] }),
      {},
    ) || { 'image/*': [] },
    onDrop: async (acceptedFiles) => {
      if (inputConstraints?.checkBlackAndWhite) {
        const blackAndWhitePromises = acceptedFiles.map(
          photoHelper.checkBlackAndWhite,
        );
        const results = await Promise.all(blackAndWhitePromises);
        setIsBlackAndWhite(results.every((result) => result));
      }

      if (inputConstraints?.maxDimensions) {
        const dimensionsPromises = acceptedFiles.map((file) =>
          photoHelper.checkImageDimensions(
            file,
            inputConstraints.maxDimensions || { width: 0, height: 0 },
          ),
        );
        const dimensionsResults = await Promise.all(dimensionsPromises);
        setIsWithinDimensions(dimensionsResults.every((result) => result));
      }

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
          style={{ maxHeight: `${height}px` }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () =>
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
  }, []);

  return (
    <div className={styles.inputArea} style={{ height: `${height}px` }}>
      <div
        className={styles.inputAreaContainer}
        style={{ height: `${height}px` }}>
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
          <aside className={styles.thumbsContainer}>{thumbs}</aside>
        </label>
      </div>
      <div className={styles.errorContainer}>
        {displayErrorMessages && (
          <>
            {isBlackAndWhite === false &&
              inputConstraints?.checkBlackAndWhite && (
                <ErrorMessage
                  display={true}
                  message={Message.BlackAndWhiteError}
                />
              )}
            {isWithinDimensions === false &&
              inputConstraints?.maxDimensions && (
                <ErrorMessage
                  display={true}
                  message={Message.DimensionsError.replace(
                    '{width}',
                    `${inputConstraints.maxDimensions.width}`,
                  ).replace(
                    '{height}',
                    `${inputConstraints.maxDimensions.height}`,
                  )}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoInput;
