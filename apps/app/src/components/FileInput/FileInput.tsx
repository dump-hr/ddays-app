import React, { useRef, useState } from 'react';
import c from './FileInput.module.scss';
import addSvg from '../../assets/icons/add.svg';
import binSvg from '../../assets/icons/bin.svg';

interface FileInputProps {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  error?: string;
  title: string;
}

const FileInput: React.FC<FileInputProps> = ({ file, setFile, error, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSizeError, setFileSizeError] = useState<string | undefined>();

  const handleFileUpload = () => {
    if (fileInputRef.current && !file) {
      fileInputRef.current.click();
    }
  };

  const handleFileDelete = () => {
    if (file) {
      setFile(undefined);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.size < 5 * 1024 * 1024) {
      setFile(uploadedFile);
      setFileSizeError(undefined);
    }
    else{
      setFile(undefined);
      setFileSizeError('Datoteka je iznad 5MB');
    }
  };

  return (
    <>
      <div className={c.fileUploadContainer} onClick={handleFileUpload}>
        <p>{file ? file.name : title} </p>
        <button onClick={handleFileDelete}>
          <img src={file ? binSvg : addSvg} alt='' />
        </button>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {(error) && <p className={c.errorMessage}>{error}</p>}
      {fileSizeError && <p className={c.errorMessage}>{fileSizeError}</p>}
    </>
  );
};

export default FileInput;