import { AchievementDto } from '@ddays-app/types';
import c from './AchievementCard.module.scss';
//import RedStar from '../../assets/icons/rating-star-1.svg';
//import Star from '../../assets/icons/rating-star-1.svg';
import sprite from '../../assets/sprite.svg';
import clsx from 'clsx';

type AchievementCardProps = {
  achievement: AchievementDto;
  goal: number;
  progress: number;
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  goal,
  progress,
}) => {
  const percentage = Math.round((progress / goal) * 100);
  const isCompleted = percentage >= 99;

  return (
    <div
      className={clsx({
        [c.achievementCard]: true,
        [c.completed]: isCompleted,
      })}>
      <div className={c.pointsWrapper}>
        <svg className={c.star}>
          <use href={`${sprite}#star`} />
        </svg>
        <p className={c.points}>{achievement.points}</p>
      </div>
      <p className={c.name}>{achievement.name}</p>
      <p className={c.description}>{achievement.description}</p>

      <div className={c.progressBarWrapper}>
        <div className={c.progressBarInfo}>
          <p className={c.stepCount}>
            {progress}/{goal}
          </p>
          <p className={c.percentage}>{percentage}%</p>
        </div>
        <div className={c.progressBar}>
          <div className={c.progress} style={{ width: `${percentage}%` }} />
        </div>
      </div>

      <p className={c.completedMessage}>Završeno!</p>
    </div>
  );
};

export default AchievementCard;
