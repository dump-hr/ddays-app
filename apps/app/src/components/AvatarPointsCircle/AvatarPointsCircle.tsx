//import { getLevelFromPoints } from '../../helpers/getLevelFromPoints';

type AvatarPointsCircleProps = {
  points: number;
  avatar: string;
};

const AvatarPointsCircle: React.FC<AvatarPointsCircleProps> = ({ points }) => {
  // const levelStats = getLevelFromPoints(points);
  return <>{points}</>;
};

export default AvatarPointsCircle;
