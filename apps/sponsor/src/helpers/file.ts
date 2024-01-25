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

    resolve(video);
  });
};

export const checkBlackAndWhite = (file: File) => {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(false);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let isBlackAndWhite = true;

      for (let i = 0; i < data.length; i += 4) {
        if (
          data[i] !== 0 ||
          data[i + 1] !== 0 ||
          data[i + 2] !== 0 ||
          (data[i] !== 255 && data[i + 1] !== 255 && data[i + 2] !== 255)
        ) {
          isBlackAndWhite = false;
          break;
        }
      }

      resolve(isBlackAndWhite);
    };
  });
};

export const checkImageDimensions = (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      resolve(img.width <= maxWidth && img.height <= maxHeight);
    };
  });
};
