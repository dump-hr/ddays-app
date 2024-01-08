import {useDropzone} from 'react-dropzone';

import styles from './PhotoInput.module.scss';
import sprite from '../../../public/sprite.svg';

type PhotoInputProps = {
  crop?: boolean;
  label?: string
  errorMessage?: {
    display: boolean;
    content: string;
  };
  inputConstraints?: {
    imageType?: string;
    aspectRatio?: number;
    mimeType?: string;
    maxFileSize?: number;
    maxDimensions?: {
      width: number;
      height: number;
    };
  };
};

const PhotoInput: React.FC<PhotoInputProps> = ({
  crop = false,
  label,
  errorMessage,
  inputConstraints,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone();

  return (
    <div className={styles.inputArea}>
        <div className={styles.inputAreaContainer}>
            <label className={styles.inputAreaLabel}>
                {!acceptedFiles.length && (
                    <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <div className={styles.inputFieldLabel}>
                            <svg height='21px' width='24px'>
                                <use href={`${sprite}#upload-materials`} />
                            </svg>
                            <p>
                                {label}
                            </p>
                        </div>
                    </div>
                )}
            </label>
        </div>
    </div>
  );
};

export default PhotoInput;
