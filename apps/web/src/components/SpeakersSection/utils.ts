import { SpeakerDto } from '@ddays-app/types';

const getEquallySplitArray = (array: SpeakerDto[], numberOfChunks: number) => {
  if (numberOfChunks < 2) {
    return [array];
  }

  const balancedArray = [] as SpeakerDto[][];

  for (let i = 0; i < numberOfChunks; i++) {
    balancedArray.push([] as SpeakerDto[]);
  }

  for (let i = 0; i < array.length; i++) {
    balancedArray[i % numberOfChunks].push(array[i]);
  }

  return balancedArray;
};

export const getColumns = (array: SpeakerDto[], isMobile: boolean) => {
  const desktopNumberOfColumns = 4;
  const mobileNumberOfColumns = 2;

  if (isMobile) {
    return getEquallySplitArray(array, mobileNumberOfColumns);
  }

  return getEquallySplitArray(array, desktopNumberOfColumns);
};

export const getCardWidth = (screenWidth: number) => {
  const desktopSidePadding = 32;
  const desktopCardMargin = 32;
  const numberOfColumns = 4;
  if (screenWidth >= 1440) {
    return 320;
  }

  return (
    (screenWidth -
      2 * desktopSidePadding -
      (numberOfColumns - 1) * desktopCardMargin) /
      numberOfColumns -
    5
  );
};
