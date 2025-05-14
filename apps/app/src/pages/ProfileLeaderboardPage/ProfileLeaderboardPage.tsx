import { useNavigate } from 'react-router-dom';
import styles from './ProfileLeaderboardPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import TopRanking from './sections/TopRanking';
import LeaderboardTable from './sections/LeaderboardTable';
import WhiteArrowLeft from '@/assets/icons/arrow-left-white.svg';
import { useAchievementCompleteByName } from '@/api/achievement/useAchievementCompleteByName';
import { AchievementNames } from '@ddays-app/types';
import { useEffect } from 'react';
import { useDeviceType } from '@/hooks/UseDeviceType';
import { useInfiniteLeaderboard } from '@/api/leaderboard/useInfiniteLeaderboard';
import LoadingSpinner from '@/components/LoadingSpinner';

export const ProfileLeaderboardPage = () => {
  const navigate = useNavigate();
  const isMobile = useDeviceType({ breakpoint: 768 });

  const { mutate: completeAchievementByName } = useAchievementCompleteByName();

  useEffect(() => {
    completeAchievementByName({ name: AchievementNames.BraveMove });
  }, []);

  const {
    data: leaderboardData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: leaderboardStatus,
    isLoading: isLeaderboardLoading,
  } = useInfiniteLeaderboard({ pageSize: 10 });

  const topThreeUsers = leaderboardData?.pages[0]?.entries.slice(0, 3) || [];

  const flattenedLeaderboard =
    leaderboardData?.pages.flatMap((page) => page.entries) || [];

  const slicedLeaderboard = flattenedLeaderboard.slice(
    3,
    flattenedLeaderboard.length,
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img
          src={WhiteArrowLeft}
          alt='Back'
          className={styles.headerArrowLeft}
          onClick={() => navigate(-1)}
        />
      </header>
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          {isMobile && (
            <img
              src={ArrowLeft}
              alt='Back'
              className={styles.arrowLeft}
              onClick={() => navigate(-1)}
            />
          )}
          <h3 className={styles.title}>Leaderboard</h3>
        </header>

        {isLeaderboardLoading ? (
          <div className={styles.loadingSpinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.flexWrapper}>
            <TopRanking
              topThree={topThreeUsers}
              isLoading={isLeaderboardLoading}
            />
            <LeaderboardTable
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              leaderboardStatus={
                leaderboardStatus === 'idle' ? 'loading' : leaderboardStatus
              }
              slicedLeaderboard={slicedLeaderboard}
            />
          </div>
        )}
      </main>
    </div>
  );
};
