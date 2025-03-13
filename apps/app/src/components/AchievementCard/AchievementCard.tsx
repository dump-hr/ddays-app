import { AchievementDto } from '@ddays-app/types';

type AchievementCardProps = {
  achievement: AchievementDto;
};

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <div>
      <h1>{achievement.id}</h1>
    </div>
  );
};

export default AchievementCard;
