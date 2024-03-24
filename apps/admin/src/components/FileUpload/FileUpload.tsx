import { useDropzone } from 'react-dropzone';

import { Button } from '../Button';
import c from './FileUpload.module.scss';

type FileUploadProps = {
  src: string | ArrayBuffer | null;
  label?: string;
  accept?: string | undefined;
  setSrc: (result: string | ArrayBuffer | null) => void;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  src,
  label = null,
  accept = 'image/*',
  setSrc,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const file = new FileReader();

      file.onload = () => {
        setSrc(file.result);
      };

      file.readAsDataURL(acceptedFiles[0]);
    },
  });

  const handleFileRemove = () => {
    setSrc(null);
  };

  return (
    <div className={c.dragNDropWrapper}>
      {label && <p>{label}</p>}
      {!src && (
        <div className={c.dragNDropArea} {...getRootProps()}>
          <input accept={accept} {...getInputProps()} />
          {isDragActive ? (
            <p className={c.dragNDropAreaText}>Drop the files here ...</p>
          ) : (
            <p className={c.dragNDropAreaText}>
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      )}

      {src && (
        <div className={c.previewWrapper}>
          <img className={c.img} src={src as string} alt='preview' />
          <Button onClick={handleFileRemove}>Remove</Button>
        </div>
      )}
    </div>
  );
};
