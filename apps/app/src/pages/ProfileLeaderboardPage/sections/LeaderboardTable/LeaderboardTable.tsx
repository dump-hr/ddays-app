import LoadingSpinner from '@/components/LoadingSpinner';
import styles from './LeaderboardTable.module.scss';
import LeaderboardTableRow from '@/components/LeaderboardTableRow';
import ErrorMessage from '@/components/ErrorMessage';
import { useCallback, useRef } from 'react';
import { useGetUserRank } from '@/api/leaderboard/useGetUserRank';
import { useInfiniteLeaderboard } from '@/api/leaderboard/useInfiniteLeaderboard';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

const LeaderboardTable = () => {
  const {
    data: leaderboardData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: leaderboardStatus,
  } = useInfiniteLeaderboard({ pageSize: 10 });

  const { data: user } = useLoggedInUser();
  const { data: userRank, status: userRankStatus } = useGetUserRank();

  const flattenedLeaderboard =
    leaderboardData?.pages.flatMap((page) => page.entries) || [];

  const slicedLeaderboard = flattenedLeaderboard.slice(
    3,
    flattenedLeaderboard.length,
  );

  const observer = useRef<IntersectionObserver>();
  const lastRowRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            setTimeout(() => {
              fetchNextPage();
            }, 500);
          }
        },
        {
          threshold: 1,
        },
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const personalRankData = userRank?.user ?? null;

  if (leaderboardStatus === 'error' || userRankStatus === 'error') {
    return (
      <ErrorMessage message='Dogodila se greška sa učitavanjem ljestvice' />
    );
  }

  return (
    <div className={styles.leaderboardWrapper}>
      <>
        {(personalRankData?.rank ?? Infinity) <= 3 && user?.isConfirmed && (
          <div className={styles.congratulationWrapper}>
            <h3 className={styles.congratulationText}>
              🏆 Bravo, čestitamo na {userRank?.user.rank}. mjestu!
            </h3>
          </div>
        )}

        {!user?.isConfirmed && (
          <div className={styles.congratulationWrapper}>
            <h3 className={styles.congratulationText}>
              Potvrdi svoj račun kako bi sudjelovao u nagradnoj igri.
            </h3>
          </div>
        )}

        {personalRankData && (personalRankData?.rank ?? 0) > 3 && (
          <div className={styles.personalRankWrapper}>
            <table className={styles.leaderboardTable}>
              <tbody>
                <LeaderboardTableRow
                  key={personalRankData.id}
                  userRank={personalRankData}
                />
              </tbody>
            </table>
          </div>
        )}
      </>
      <div className={styles.tableWrapper}>
        <table className={styles.leaderboardTable}>
          <tbody>
            {slicedLeaderboard.map((entry, index) => (
              <LeaderboardTableRow
                ref={
                  index === slicedLeaderboard.length - 1
                    ? lastRowRef
                    : undefined
                }
                key={`${entry.id}-${entry.rank}`}
                userRank={entry}
              />
            ))}
          </tbody>
        </table>
        {isFetchingNextPage && (
          <div className={styles.loadingRow}>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTable;
