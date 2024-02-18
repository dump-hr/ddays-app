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

      const imageData = ctx.getImageData(
        0,
        0,
        Math.max(1, canvas.width),
        Math.max(1, canvas.height),
      );
      const data = imageData.data;

      let isBlackAndWhite = true;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] !== 0) {
          if (
            !isPixelBlack(data[i], data[i + 1], data[i + 2]) &&
            !isPixelWhite(data[i], data[i + 1], data[i + 2])
          ) {
            isBlackAndWhite = false;
          }
        }
      }

      resolve(isBlackAndWhite);
    };
  });
};

const isPixelBlack = (r: number, g: number, b: number) => {
  if (r > 234 && g > 234 && b > 234) {
    return true;
  }
  return false;
};

const isPixelWhite = (r: number, g: number, b: number) => {
  if (r < 40 && g < 40 && b < 40) {
    return true;
  }
  return false;
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

export const dataURItoBlobUrl = (dataURI: string) => {
  const svg = decodeURI(dataURI).split(',')[1];
  const blob = new Blob([svg], { type: 'image/svg+xml' });

  return URL.createObjectURL(blob);
};
