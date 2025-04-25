import PopupLayout from '@/layout/PopupLayout/PopupLayout';

type ScannedAchievementPopupProps = {
  achievementId: string;
  isOpen: boolean;
  closePopup: () => void;
};

const ScannedAchievementPopup: React.FC<ScannedAchievementPopupProps> = ({
  achievementId,
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
      <p>{achievementId}</p>
    </PopupLayout>
  );
};

export default ScannedAchievementPopup;
