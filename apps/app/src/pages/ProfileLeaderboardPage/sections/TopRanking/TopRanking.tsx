import styles from './TopRanking.module.scss';
import clsx from 'clsx';
import { useGetTopUsers } from '@/api/leaderboard/useGetTopUsers';
import { LeaderboardEntryDto } from '@ddays-app/types/src/dto/leaderboard';
import star from '@/assets/icons/star-red.svg';
import RegularDuck from '@/assets/images/leaderboard-duck.png';
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
  return (
    <div className={styles.duckWrapper}>
      <div
        className={clsx(styles.topRankContainer, {
          [styles.firstPlaceContainer]: user.rank === 1,
          [styles.secondPlaceContainer]: user.rank === 2,
          [styles.thirdPlaceContainer]: user.rank === 3,
        })}>
        <img
          src={user.profilePhotoUrl || RegularDuck}
          alt={`${user.rank}. Place`}
          className={clsx(styles.duck, {
            [styles.firstPlace]: user.rank === 1,
            [styles.secondPlace]: user.rank === 2,
            [styles.thirdPlace]: user.rank === 3,
          })}
        />
      </div>
      <div className={styles.duckInfo}>
        <div className={styles.duckPointsWrapper}>
          <span
            className={clsx(styles.duckPoints, {
              [styles.firstPlacePoints]: user.rank === 1,
            })}>
            {user.points}
          </span>
          <img src={star} className={styles.star} alt='Points' />
        </div>
        <span
          className={clsx(styles.duckName, {
            [styles.firstPlaceName]: user.rank === 1,
          })}>
          {user.name.split(' ')[0]}
        </span>
      </div>
    </div>
  );
};

export default TopRanking;
