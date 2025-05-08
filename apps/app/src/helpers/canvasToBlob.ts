// Helper function to convert canvas.toBlob to Promise
const toBlobPromise = (
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
};

const resizeCanvas = (
  canvas: HTMLCanvasElement,
  targetWidth: number,
): HTMLCanvasElement => {
  const resizedCanvas = document.createElement('canvas');
  const aspectRatio = canvas.height / canvas.width;

  resizedCanvas.width = targetWidth;
  resizedCanvas.height = Math.round(targetWidth * aspectRatio);

  const ctx = resizedCanvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(canvas, 0, 0, resizedCanvas.width, resizedCanvas.height);

  return resizedCanvas;
};

export const canvasToBlob = async (
  canvas: HTMLCanvasElement,
): Promise<Blob> => {
  const webpBlob = await toBlobPromise(canvas, 'image/webp', 0.85);

  if (webpBlob) {
    return webpBlob;
  }

  const resizedCanvas = resizeCanvas(canvas, 330);
  const pngBlob = await toBlobPromise(resizedCanvas, 'image/png', 0.6);

  if (!pngBlob) {
    throw new Error('Failed to generate image');
  }

  return pngBlob;
};
