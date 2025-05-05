import { useEffect, useState } from 'react';
import NewLevelPopup from '../NewLevelPopup';
import PointModifierPopup from '../PointModifierPopup';
import { getLevelFromPoints } from '@/helpers/getLevelFromPoints';
import { UserPublicDto } from '@ddays-app/types/src/dto/user';

type AppliedCodeAchievementPopupProps = {
  isOpen: boolean;
  user: UserPublicDto | undefined;
  points: number;
};

const AppliedCodeAchievementPopup = ({
  isOpen,
  user,
  points,
}: AppliedCodeAchievementPopupProps) => {
  const [isPointModifierPopupOpen, setIsPointModifierPopupOpen] =
    useState(false);
  const [isNewLevelPopupOpen, setIsNewLevelPopupOpen] = useState(false);

  useEffect(() => {
    // Ensure user is defined and the popup is open
    if (!user || !isOpen) return;

    const oldLevel = getLevelFromPoints(user.points).level;
    const newLevel = getLevelFromPoints(user.points + points).level;

    // Open the corresponding popup based on level change or points
    if (oldLevel !== newLevel) {
      setIsNewLevelPopupOpen(true);
    } else if (points > 0) {
      setIsPointModifierPopupOpen(true);
    }
  }, [isOpen, user, points]); // Re-run this effect when these values change

  if (!user || !isOpen) return;

  return (
    <>
      <PointModifierPopup
        points={points}
        isOpen={isPointModifierPopupOpen}
        closePopup={() => setIsPointModifierPopupOpen(false)}
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
