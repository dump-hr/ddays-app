import { useEffect, useState } from 'react';
import NewLevelPopup from '../NewLevelPopup';
import PointModifierPopup from '../PointModifierPopup';
import { getLevelFromPoints } from '@/helpers/getLevelFromPoints';
import { UserPublicDto } from '@ddays-app/types/src/dto/user';

type AppliedCodeAchievementPopupProps = {
  isOpen: boolean;
  user: UserPublicDto | undefined;
  points: number;
  resetPoints: () => void;
};

const AppliedCodeAchievementPopup = ({
  isOpen,
  user,
  points,
  resetPoints,
}: AppliedCodeAchievementPopupProps) => {
  const [isPointModifierPopupOpen, setIsPointModifierPopupOpen] =
    useState(false);
  const [isNewLevelPopupOpen, setIsNewLevelPopupOpen] = useState(false);

  useEffect(() => {
    if (!user || !isOpen) return;

    const oldLevel = getLevelFromPoints(user.points).level;
    const newLevel = getLevelFromPoints(user.points + points).level;

    if (oldLevel !== newLevel) {
      setIsNewLevelPopupOpen(true);
    } else if (points > 0) {
      setIsPointModifierPopupOpen(true);
    }
  }, [isOpen, user, points]);
  if (!user || !isOpen) return;

  return (
    <>
      <PointModifierPopup
        points={points}
        isOpen={isPointModifierPopupOpen}
        closePopup={() => {
          setIsPointModifierPopupOpen(false);
          resetPoints();
        }}
      />

      <NewLevelPopup
        level={getLevelFromPoints(user.points + points).level}
        isOpen={isNewLevelPopupOpen}
        closePopup={() => setIsNewLevelPopupOpen(false)}
      />
    </>
  );
};

export default AppliedCodeAchievementPopup;
