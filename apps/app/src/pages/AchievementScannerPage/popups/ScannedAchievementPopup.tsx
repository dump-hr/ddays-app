import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { AchievementDto } from '@ddays-app/types';

type ScannedAchievementPopupProps = {
  achievement: AchievementDto | undefined;
  isOpen: boolean;
  closePopup: () => void;
};

const ScannedAchievementPopup: React.FC<ScannedAchievementPopupProps> = ({
  achievement,
  isOpen,
  closePopup,
}) => {
  return (
    <PopupLayout
      variant='light'
      desktopStyle='normal'
      headerTitleComponent='Postignuće skenirano!'
      isOpen={isOpen}
      closePopup={closePopup}>
      <p>Name: {achievement?.name}</p>
      <p>Description: {achievement?.description}</p>
    </PopupLayout>
  );
};

export default ScannedAchievementPopup;
