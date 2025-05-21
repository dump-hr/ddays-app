import { FloorPlanCompanyDto, RatingDto } from '@ddays-app/types';

export const isBoothRated = (
  boothString: string,
  availableBooths: FloorPlanCompanyDto[] | undefined,
  userRatings: RatingDto[] | undefined,
) => {
  const matchedBooth = availableBooths?.find((ab) => ab.booth === boothString);
  if (!matchedBooth) return false;

  return (
    userRatings?.some((rating) => rating.boothId === matchedBooth.boothId) ||
    false
  );
};
