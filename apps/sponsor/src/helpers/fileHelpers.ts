export const getVideoMetadata = (file: File): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');

    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video);
    };

    video.onerror = (error) => {
      reject(error);
    };

    video.src = URL.createObjectURL(file);
  });
};
