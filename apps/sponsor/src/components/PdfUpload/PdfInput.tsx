import { useDropzone } from 'react-dropzone';

import RemoveSvg from '../../assets/icons/remove.svg';
import sprite from '../../assets/icons/sprite.svg';
import c from '../PhotoInput/PhotoInput.module.scss';

type PdfInputProps = {
  label?: string;
  fileSrc?: string;
  isDisabled?: boolean;
  handleUpload: (files: File[]) => void;
  handleRemove: () => void;
};

export const PdfInput: React.FC<PdfInputProps> = ({
  label,
  fileSrc,
  isDisabled = false,
  handleRemove,
  handleUpload,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { pdf: ['pdf'] },
    onDrop: async (acceptedFiles) => {
      handleUpload(acceptedFiles);
    },
  });

  const height = 300;

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
      <div className={c.errorContainer}></div>
    </div>
  );
};
