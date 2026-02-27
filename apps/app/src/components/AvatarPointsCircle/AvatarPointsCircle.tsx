import { getLevelFromPoints } from '../../helpers/getLevelFromPoints';
import c from './AvatarPointsCircle.module.scss';
import { levelPoints } from '../../helpers/getLevelFromPoints';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

type AvatarPointsCircleProps = {
  avatar: string;
};

const AvatarPointsCircle: React.FC<AvatarPointsCircleProps> = ({ avatar }) => {
  const { data: user } = useLoggedInUser();
  const points = user?.points || 0;

  const levelStats = getLevelFromPoints(points);

  const swapKeyValue = (
    obj: Record<number, number>,
  ): Record<number, number> => {
    const swapped: Record<number, number> = {};

    Object.entries(obj).forEach(([key, value]) => {
      swapped[value] = Number(key);
    });

    return swapped;
  };

  const getCirclePercentage = (points: number) => {
    if (levelStats.level === 5) return 100;
    const pointsFromLevels = swapKeyValue(levelPoints);

    const currentThreshold = pointsFromLevels[levelStats.level];
    const nextThreshold = pointsFromLevels[levelStats.level + 1];

    return (
      ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    );
  };

  const percentageStyle = {
    backgroundImage: `conic-gradient(#E0553F, #E0553F ${getCirclePercentage(
      points,
    )}%, #484747 ${getCirclePercentage(points)}%, #484747)`,
  };

  const isPreMadeAvatar = avatar && !avatar.includes('https://');
  const avatarStyle = isPreMadeAvatar ? { scale: '0.75' } : {};

  return (
    <div className={c.outerCircle} style={percentageStyle}>
      <div className={c.innerCircle}>
        <img src={avatar} alt='Avatar' className={c.avatar} style={avatarStyle} />
        <div className={c.levelWrapper}>
          <p className={c.level}>{levelStats.level}</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarPointsCircle;
