import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import c from './FileUpload.module.scss';
import Button from '../Button';

type FileUploadProps = {
  src: string | ArrayBuffer | null;
  label?: string;
  setSrc: (result: string | ArrayBuffer | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
  src,
  label = null,
  setSrc,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader();

    file.onload = () => {
      setSrc(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileRemove = () => {
    setSrc(null);
  };

  return (
    <div className={c.dragNDropWrapper}>
      {label && <p>{label}</p>}
      {!src && (
        <div className={c.dragNDropArea} {...getRootProps()}>
          <input {...getInputProps()} />
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

export default FileUpload;
