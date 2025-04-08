import { FC } from 'react';
import c from './LeaderboardTableRow.module.scss';
import RegularDuck from '../../assets/images/leaderboard-duck.png';
import star from '../../assets/icons/star-red.svg';

interface LeaderboardTableRowProps {
  rank: number;
  name: string;
  level: number;
  points: number;
}

const LeaderboardTableRow: FC<LeaderboardTableRowProps> = ({
  rank,
  name,
  level,
  points,
}) => {
  return (
    <tr className={c.row}>
      <td className={c.rankCell}>{rank}.</td>
      <td className={c.playerCell}>
        <div className={c.playerContent}>
          <img src={RegularDuck} alt='Duck' className={c.duckIcon} />
          <div className={c.playerInfo}>
            <span className={c.playerName}>{name}</span>
            <span className={c.playerLevel}>Level {level}</span>
          </div>
        </div>
      </td>
      <td className={c.pointsCell}>
        {points} <img src={star} className={c.star} alt='Star' />
      </td>
    </tr>
  );
};

export default LeaderboardTableRow;
