import { useDropzone } from 'react-dropzone';

import { Button } from '../Button';
import c from './FileUpload.module.scss';

type FileUploadProps = {
  src: string | ArrayBuffer | null | undefined;
  label?: string;
  accept?: string | undefined;
  handleUpload: (files: File[]) => void;
  handleRemove: () => void;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  src,
  label = null,
  accept = 'image/*',
  handleUpload,
  handleRemove,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      handleUpload(acceptedFiles);
    },
  });

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
          <Button onClick={() => handleRemove()}>Remove</Button>
        </div>
      )}
    </div>
  );
};
