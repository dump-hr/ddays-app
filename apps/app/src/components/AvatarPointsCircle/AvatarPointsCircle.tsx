import { getLevelFromPoints } from '../../helpers/getLevelFromPoints';
import c from './AvatarPointsCircle.module.scss';

type AvatarPointsCircleProps = {
  points: number;
  avatar: string;
};

const AvatarPointsCircle: React.FC<AvatarPointsCircleProps> = ({
  points,
  avatar,
}) => {
  const levelStats = getLevelFromPoints(points);
  return (
    <div className={c.outerCircle}>
      <div className={c.innerCircle}>
        <img src={avatar} alt='' />
        <div className={c.levelWrapper}>
          <p className={c.level}>{levelStats.level}</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarPointsCircle;
