import AchievementCard from '@/components/AchievementCard';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { AchievementDto } from '@ddays-app/types';
import c from './ScannedAchievementPopup.module.scss';
import Button from '@/components/Button';
import { useAchievementComplete } from '@/api/achievement/useAchievementComplete';

type ScannedAchievementPopupProps = {
  achievement: AchievementDto;
  isCompleted: boolean;
  isOpen: boolean;
  closePopup: (points?: number) => void;
  uuid: string;
};

const ScannedAchievementPopup: React.FC<ScannedAchievementPopupProps> = ({
  achievement,
  isCompleted,
  isOpen,
  closePopup,
  uuid,
}) => {
  const completeAchievement = useAchievementComplete();

  async function handleComplete() {
    completeAchievement.mutate(uuid, {
      onSuccess: (achievement) => {
        closePopup(achievement.points);
      },
    });
  }

  return (
    <PopupLayout
      variant='light'
      desktopStyle='normal'
      headerTitleComponent='Postignuće skenirano!'
      isOpen={isOpen}
      closePopup={closePopup}>
      <div className={c.content}>
        <div className={c.achievementCardWrapper}>
          <AchievementCard
            achievement={achievement}
            isCompleted={isCompleted}
          />
        </div>
        <Button
          className={c.button}
          variant='orange'
          disabled={isCompleted}
          onClick={handleComplete}>
          Preuzmi
        </Button>
      </div>
    </PopupLayout>
  );
};

export default ScannedAchievementPopup;
