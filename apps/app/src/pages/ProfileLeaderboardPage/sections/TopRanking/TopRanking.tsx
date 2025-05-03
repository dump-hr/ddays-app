import styles from './TopRanking.module.scss';
import clsx from 'clsx';
import { useGetTopUsers } from '@/api/leaderboard/useGetTopUsers';
import { LeaderboardEntryDto } from '@ddays-app/types/src/dto/leaderboard';

import FirstPlaceDuck from '@/assets/images/first-place.png';
import SecondPlaceDuck from '@/assets/images/second-place.png';
import ThirdPlaceDuck from '@/assets/images/third-place.png';
import star from '@/assets/icons/star-red.svg';

import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';

const TopRanking = () => {
  const { data: topUsers, status: topUsersStatus } = useGetTopUsers();

  const firstPlace = topUsers?.[0];
  const secondPlace = topUsers?.[1];
  const thirdPlace = topUsers?.[2];

  if (topUsersStatus === 'loading') {
    return (
      <div className={styles.loadingSpinner}>
        <LoadingSpinner />
      </div>
    );
  }

  if (topUsersStatus === 'error') {
    return (
      <ErrorMessage message='Dogodila se greška sa učitavanjem ljestvice' />
    );
  }

  return (
    <div className={styles.duckContainer}>
      {secondPlace && <TopRankingUser user={secondPlace} />}
      {firstPlace && <TopRankingUser user={firstPlace} />}
      {thirdPlace && <TopRankingUser user={thirdPlace} />}
    </div>
  );
};

const TopRankingUser = ({ user }: { user: LeaderboardEntryDto }) => {
  const getDuckImage = (rank: number) => {
    if (rank === 1) return FirstPlaceDuck;
    if (rank === 2) return SecondPlaceDuck;
    return ThirdPlaceDuck;
  };

  return (
    <div className={styles.duckWrapper}>
      <img
        src={getDuckImage(user.rank)}
        alt={`${user.rank}. Place`}
        className={clsx(styles.duck, {
          [styles.firstPlace]: user.rank === 1,
          [styles.secondPlace]: user.rank === 2,
          [styles.thirdPlace]: user.rank === 3,
        })}
      />
      <div className={styles.duckInfo}>
        <div className={styles.duckPointsWrapper}>
          <span className={styles.duckPoints}>{user.points}</span>
          <img src={star} className={styles.star} alt='Points' />
        </div>
        <span className={styles.duckName}>{user.name.split(' ')[0]}</span>
      </div>
    </div>
  );
};

export default TopRanking;
