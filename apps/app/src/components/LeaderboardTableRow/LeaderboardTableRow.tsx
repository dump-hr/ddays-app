import { forwardRef } from 'react';
import c from './LeaderboardTableRow.module.scss';
import RegularDuck from '@/assets/images/leaderboard-duck.png';
import star from '@/assets/icons/star-red.svg';
import { LeaderboardEntryDto } from '@ddays-app/types/src/dto/leaderboard';

interface LeaderboardTableRowProps {
  userRank: LeaderboardEntryDto;
}

const LeaderboardTableRow = forwardRef<
  HTMLTableRowElement,
  LeaderboardTableRowProps
>(({ userRank }, ref) => {
  const { rank, name, level, points, profilePhotoUrl } = userRank;
  const scaleImg = profilePhotoUrl
    ? {
        scale: !profilePhotoUrl?.includes('https://') ? '1' : '1.4',
      }
    : {};

  return (
    <tr className={c.row} ref={ref}>
      <td className={c.rankCell}>{rank}.</td>
      <td className={c.playerCell}>
        <div className={c.playerContent}>
          <img
            src={profilePhotoUrl || RegularDuck}
            alt='Duck'
            className={c.duckIcon}
            style={scaleImg}
          />
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
});

LeaderboardTableRow.displayName = 'LeaderboardTableRow';

export default LeaderboardTableRow;
