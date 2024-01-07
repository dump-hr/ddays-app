import styles from "./PhotoInput.module.scss";

type PhotoInputProps = {
    crop?: boolean;
    label?: {
        title?: string;
        body?: string;
        uploadArea?: string;
    }
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
        }
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
    }

    return (
      <div>
        <input 
            className={styles.inputField}
            type="file"
            accept={inputConstraints?.mimeType ?? "image/*"}
            onChange={handleFileUpload}
        />
      </div>
    );
  };
  
  export default PhotoInput;
  