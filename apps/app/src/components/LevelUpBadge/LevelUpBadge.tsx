import c from './LevelUpBadge.module.scss';
import NewLevelBadge from '@/assets/images/new-level-badge.png';
import CircularRays from '@/assets/images/circular-rays.svg';

type LevelUpBadgeProps = {
  level: number;
};

const LevelUpBadge: React.FC<LevelUpBadgeProps> = ({ level }) => {
  return (
    <div className={c.badge}>
      <img src={CircularRays} className={c.rays} />
      <img src={NewLevelBadge} className={c.badgeImage} alt='Novi level' />
      <h3 className={c.level}>{level}</h3>
    </div>
  );
};

export default LevelUpBadge;
