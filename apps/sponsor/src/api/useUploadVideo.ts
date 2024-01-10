import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const uploadVideo = async (
  file: File,
  setProgress: Dispatch<SetStateAction<number>>,
) => {
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'video/mp4');

  await api.patch('/companies/video', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (ev) =>
      !!ev.total && setProgress(Math.round((ev.loaded * 100) / ev.total)),
  });
};

export const useUploadVideo = () => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation<void, AxiosError, File>(
    (file) => uploadVideo(file, setProgress),
    {
      onSuccess: (data) => {
        console.log(data);
        toast.success('Video uploaded');
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  return { ...mutation, progress };
};
