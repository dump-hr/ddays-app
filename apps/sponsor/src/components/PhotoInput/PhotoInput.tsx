import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import RemoveSvg from '../../assets/icons/remove.svg';
import sprite from '../../assets/icons/sprite.svg';
import { checkBlackAndWhite, checkImageDimensions } from '../../helpers';
import { ErrorMessage } from './ErrorMessage';
import c from './PhotoInput.module.scss';

type PhotoInputProps = {
  label?: string;
  displayErrorMessages?: boolean;
  inputConstraints?: {
    mimeTypes?: string[];
    maxWidth?: number;
    maxHeight?: number;
    checkBlackAndWhite?: boolean;
  };
  height?: number;
  fileSrc?: string;
  isDisabled?: boolean;
  handleUpload: (files: File[]) => void;
  handleRemove: () => void;
  fileType: 'logo' | 'image';
};

export const PhotoInput: React.FC<PhotoInputProps> = ({
  label,
  displayErrorMessages = false,
  inputConstraints,
  height = 362,
  fileSrc,
  isDisabled = false,
  handleUpload,
  handleRemove,
  fileType,
}) => {
  const [isBlackAndWhite, setIsBlackAndWhite] = useState<boolean | null>(null);
  const [isWithinDimensions, setIsWithinDimensions] = useState<boolean>(true);

  const { getRootProps, getInputProps } = useDropzone({
    accept: inputConstraints?.mimeTypes?.reduce(
      (acc, type) => ({ ...acc, [`image/${type}`]: [] }),
      {},
    ) || { 'image/*': [] },
    onDrop: async (acceptedFiles) => {
      if (inputConstraints?.checkBlackAndWhite) {
        const blackAndWhitePromises = acceptedFiles.map(checkBlackAndWhite);
        const results = await Promise.all(blackAndWhitePromises);
        setIsBlackAndWhite(results.every((result) => result));

        if (fileType === 'logo' && results.every((result) => result)) {
          handleUpload(acceptedFiles);
        }
      }

      if (inputConstraints?.maxWidth || inputConstraints?.maxHeight) {
        const dimensionsPromises = acceptedFiles.map((file) =>
          checkImageDimensions(
            file,
            inputConstraints?.maxWidth || 0,
            inputConstraints?.maxHeight || 0,
          ),
        );
        const dimensionsResults = await Promise.all(dimensionsPromises);
        setIsWithinDimensions(dimensionsResults.every((result) => result));

        if (
          fileType === 'image' &&
          dimensionsResults.every((result) => result)
        ) {
          handleUpload(acceptedFiles);
        }
      }
    },
  });

  return (
    <div className={c.inputArea} style={{ height: `${height}px` }}>
      <div className={c.inputAreaContainer} style={{ height: `${height}px` }}>
        {!fileSrc && (
          <div className={c.inputField} {...getRootProps()}>
            <input disabled={isDisabled} {...getInputProps()} />
            <div className={c.inputFieldLabel}>
              <svg height='21px' width='24px'>
                <use href={`${sprite}#upload-materials`} />
              </svg>
              <p>{label}</p>
            </div>
          </div>
        )}
        {!!fileSrc}
        <aside className={c.thumbsContainer}>
          {!!fileSrc && (
            <div className={c.thumb}>
              <div className={c.thumbInner}>
                <img
                  src={fileSrc}
                  className={c.image}
                  style={{ maxHeight: `${height}px` }}
                />
              </div>
            </div>
          )}
        </aside>

        {!!fileSrc && (
          <button className={c.removeButton} onClick={() => handleRemove()}>
            <img className={c.removeSvg} src={RemoveSvg} alt='Ukloni' />
            <p>Ukloni</p>
          </button>
        )}
      </div>
      <div className={c.errorContainer}>
        {displayErrorMessages && (
          <>
            {!isBlackAndWhite && inputConstraints?.checkBlackAndWhite && (
              <ErrorMessage message='Logo mora biti crno bijeli' />
            )}
            {(inputConstraints?.maxWidth || inputConstraints?.maxHeight) &&
              !isWithinDimensions && (
                <ErrorMessage
                  message={`Fotografija mora imati dimenzije manje od ${inputConstraints.maxWidth}x${inputConstraints.maxHeight}`}
                />
              )}
          </>
        )}
      </div>
    </div>
  );
};
