import { useMutation } from 'react-query';
import axios from '../base';
import toast from 'react-hot-toast';

const uploadCV = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  return await axios.post('event/upload-cv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'text',
  });
};

export const useUploadCV = () => {
  return useMutation((file: File) => uploadCV(file), {
    onError: () => {
      toast.error('Greška prilikom slanja CV-a');
    },
  });
};
