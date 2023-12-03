import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import c from "./FileUpload.module.scss";
import Button from "../Button";

type FileUploadProps = {
  preview: string | ArrayBuffer | null;
  setPreview: (result: string | ArrayBuffer | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ preview, setPreview }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileRemove = () => {
    setPreview(null);
  };

  return (
    <div className={c.dragNDropWrapper}>
      {!preview && (
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

      {preview && (
        <div className={c.previewWrapper}>
          <img className={c.img} src={preview as string} alt="preview" />
          <Button onClick={handleFileRemove}>Remove</Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
