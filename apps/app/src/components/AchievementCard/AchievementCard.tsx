import c from './AchievementCard.module.scss';
import sprite from '../../assets/sprite.svg';
import clsx from 'clsx';
import { AchievementDto } from '@ddays-app/types';

type AchievementCardProps = {
  achievement: AchievementDto;
  isCompleted?: boolean;
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isCompleted = false,
}) => {
  return (
    <div
      className={clsx({
        [c.achievementCard]: true,
        [c.completed]: isCompleted,
      })}>
      <div className={c.mainContent}>
        <div className={c.pointsWrapper}>
          <svg className={c.star}>
            <use href={`${sprite}#star`} />
          </svg>
          <p className={c.points}>{achievement.points}</p>
        </div>
        <p className={c.name}>{achievement.name}</p>
        <p className={c.description}>{achievement.description}</p>
      </div>

      {isCompleted && (
        <div className={c.completedMessageWrapper}>
          <p className={c.completedMessage}>Completed!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
