import clsx from 'clsx';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

import RemoveSvg from '../../assets/icons/remove.svg';
import UploadSvg from '../../assets/icons/upload.svg';
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
}) => {
  const [isBlackAndWhite, setIsBlackAndWhite] = useState<boolean>(true);
  const [isWithinDimensions, setIsWithinDimensions] = useState<boolean>(true);

  const { getRootProps, getInputProps } = useDropzone({
    accept: inputConstraints?.mimeTypes?.reduce(
      (acc, type) => ({ ...acc, [`image/${type}`]: [] }),
      {},
    ) || { 'image/*': [] },
    onDrop: async (acceptedFiles) => {
      if (
        inputConstraints?.mimeTypes?.includes('svg+xml') &&
        acceptedFiles.length === 0
      ) {
        toast.error('SVG File is required');
        return;
      }

      if (inputConstraints?.checkBlackAndWhite) {
        const blackAndWhitePromises = acceptedFiles.map(checkBlackAndWhite);
        const results = await Promise.all(blackAndWhitePromises);
        setIsBlackAndWhite(results.every((result) => result));

        if (!results.every((result) => result)) {
          return;
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

        if (!dimensionsResults.every((result) => result)) {
          return;
        }
      }

      handleUpload(acceptedFiles);
    },
  });

  return (
    <div className={c.inputArea} style={{ height: `${height}px` }}>
      <div
        className={clsx(c.inputAreaContainer, {
          [c.inputAreaContainerFull]: !!fileSrc,
        })}
        style={{ height: `${height}px` }}>
        {!fileSrc && (
          <div className={c.inputField} {...getRootProps()}>
            <input disabled={isDisabled} {...getInputProps()} />
            <div className={c.inputFieldLabel}>
              <img src={UploadSvg} alt='Upload' />
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
              <ErrorMessage message='Logo mora biti u pozitivu ili negativu' />
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
