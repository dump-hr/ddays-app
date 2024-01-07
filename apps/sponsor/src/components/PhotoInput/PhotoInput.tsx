import styles from './PhotoInput.module.scss';
import sprite from '../../../public/sprite.svg';

type PhotoInputProps = {
  crop?: boolean;
  label?: {
    title?: string;
    content?: string;
    uploadArea?: string;
  };
  errorMessage?: {
    display: boolean;
    content: string;
  };
  inputConstraints?: {
    imageCount?: number;
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

  return (
    <div className={styles.inputArea}>
        <div className={styles.labelArea}>
            <h4 className={styles.labelAreaTitle}>{label?.title}</h4>
            <div className={styles.labelAreaContent}>{label?.content}</div>
        </div>
        <div className={styles.inputAreaContainer}>
            <label className={styles.label}>
                <input
                className={styles.inputField}
                type='file'
                accept={inputConstraints?.mimeType ?? 'image/*'}
                onChange={handleFileUpload}
                />
                <div className={styles.inputFieldLabel}>
                    <svg height='21px' width='24px'>
                        <use href={`${sprite}#upload-materials`} />
                    </svg>
                    {label?.uploadArea ?? ''}
                </div>
            </label>
        </div>
    </div>
  );
};

export default PhotoInput;
