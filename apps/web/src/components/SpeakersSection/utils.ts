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
  const desktopNumberOfColumns = 4;
  const mobileNumberOfColumns = 2;
  const mobileSidePadding = 16;
  const mobileCardMargin = 16;
  if (screenWidth >= 1440) {
    return 320;
  }

  if (screenWidth < 950) {
    return calculateWidth(
      screenWidth,
      mobileSidePadding,
      mobileNumberOfColumns,
      mobileCardMargin,
      9,
    );
  }

  return calculateWidth(
    screenWidth,
    desktopSidePadding,
    desktopNumberOfColumns,
    desktopCardMargin,
    5,
  );
};

const calculateWidth = (
  screenWidth: number,
  padding: number,
  numberOfColumns: number,
  margin: number,
  correction: number,
) => {
  //for some reason the exact number of pixels doesn't fit right
  //correction is a small number of pixels that makes the
  //card slightly smaller
  //has to be greater than 0
  return (
    (screenWidth - 2 * padding - (numberOfColumns - 1) * margin) /
      numberOfColumns -
    correction
  );
};
