import { useNavigate } from 'react-router-dom';
import { useRef, useCallback } from 'react';
import c from './ProfileLeaderboardPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import FirstPlaceDuck from '@/assets/images/first-place.png';
import SecondPlaceDuck from '@/assets/images/second-place.png';
import ThirdPlaceDuck from '@/assets/images/third-place.png';
import star from '@/assets/icons/star-red.svg';
import LeaderboardTableRow from '@/components/LeaderboardTableRow';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useInfiniteLeaderboard } from '@/api/leaderboard/useInfiniteLeaderboard';
import { useGetTopUsers } from '@/api/leaderboard/useGetTopUsers';
import { useGetUserRank } from '@/api/leaderboard/useGetUserRank';
import { getLevelFromPoints } from '@/helpers/getLevelFromPoints';

export const ProfileLeaderboardPage = () => {
  const navigate = useNavigate();

  const {
    data: leaderboardData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: leaderboardStatus,
  } = useInfiniteLeaderboard({ pageSize: 10 });

  const { data: topUsers, status: topUsersStatus } = useGetTopUsers();
  const { data: userRank, status: userRankStatus } = useGetUserRank();

  const flattenedLeaderboard =
    leaderboardData?.pages.flatMap((page) =>
      page.entries.map((entry) => ({
        id: entry.id,
        rank: entry.rank,
        name: `${entry.firstName} ${entry.lastName}`,
        level: getLevelFromPoints(entry.points).level,
        points: entry.points,
      })),
    ) || [];

  const slicedLeaderboard = flattenedLeaderboard.slice(
    3,
    flattenedLeaderboard.length,
  );

  const observer = useRef<IntersectionObserver>();
  const lastRowRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage
        ) {
          setTimeout(() => {
            fetchNextPage();
          }, 300);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const firstPlace = topUsers?.[0];
  const secondPlace = topUsers?.[1];
  const thirdPlace = topUsers?.[2];

  const isFirstPlace = userRank?.user?.rank === 1;
  const personalRankData = userRank?.user
    ? {
        id: userRank.user.id,
        rank: userRank.user.rank,
        name: `${userRank.user.firstName} ${userRank.user.lastName}`,
        level: getLevelFromPoints(userRank.user.points).level,
        points: userRank.user.points,
      }
    : null;

  if (
    leaderboardStatus === 'error' ||
    topUsersStatus === 'error' ||
    userRankStatus === 'error'
  ) {
    return (
      <div className={c.errorMessage}>
        Nastao je problem sa učitavanjem ljestvice
      </div>
    );
  }

  return (
    <div className={c.page}>
      <header className={c.header}>
        <img
          src={ArrowLeft}
          alt='Back'
          className={c.headerArrowLeft}
          onClick={() => navigate(-1)}
        />
      </header>
      <main className={c.main}>
        <header className={c.mainHeader}>
          <img
            src={ArrowLeft}
            alt='Back'
            className={c.arrowLeft}
            onClick={() => navigate(-1)}
          />
          <h3 className={c.title}>Leaderboard</h3>
        </header>
        <div className={c.flexWrapper}>
          <div className={c.duckContainer}>
            {/* Second Place Duck */}
            {secondPlace && (
              <div className={c.duckWrapper}>
                <img
                  src={SecondPlaceDuck}
                  alt='Second Place'
                  className={`${c.duck} ${c.secondPlace}`}
                />
                <div className={c.duckInfo}>
                  <div className={c.duckPointsWrapper}>
                    <span className={c.duckPoints}>{secondPlace.points}</span>
                    <img src={star} className={c.star} alt='Points' />
                  </div>
                  <span className={c.duckName}>{secondPlace.firstName}</span>
                </div>
              </div>
            )}

            {/* First Place Duck */}
            {firstPlace && (
              <div className={c.duckWrapper}>
                <img
                  src={FirstPlaceDuck}
                  alt='First Place'
                  className={`${c.duck} ${c.firstPlace}`}
                />
                <div className={c.duckInfo}>
                  <div className={c.duckPointsWrapper}>
                    <span className={c.duckPoints}>{firstPlace.points}</span>
                    <img src={star} className={c.star} alt='Points' />
                  </div>
                  <span className={c.duckName}>{firstPlace.firstName}</span>
                </div>
              </div>
            )}

            {/* Third Place Duck */}
            {thirdPlace && (
              <div className={c.duckWrapper}>
                <img
                  src={ThirdPlaceDuck}
                  alt='Third Place'
                  className={`${c.duck} ${c.thirdPlace}`}
                />
                <div className={c.duckInfo}>
                  <div className={c.duckPointsWrapper}>
                    <span className={c.duckPoints}>{thirdPlace.points}</span>
                    <img src={star} className={c.star} alt='Points' />
                  </div>
                  <span className={c.duckName}>{thirdPlace.firstName}</span>
                </div>
              </div>
            )}
          </div>

          <div className={c.leaderboardWrapper}>
            {/* Congratulation message for first place */}
            {isFirstPlace && (
              <>
                <div className={c.congratulationWrapper}>
                  <h3 className={c.congratulationText}>
                    🏆 Bravo, čestitamo na 1. mjestu!
                  </h3>
                </div>

                {personalRankData && (
                  <div className={c.personalRankWrapper}>
                    <table className={c.leaderboardTable}>
                      <tbody>
                        <LeaderboardTableRow
                          key={personalRankData.id}
                          rank={personalRankData.rank}
                          name={personalRankData.name}
                          level={personalRankData.level}
                          points={personalRankData.points}
                        />
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Leaderboard table with infinite scrolling */}
            <div className={c.leaderboardWrapper}>
              <table className={c.leaderboardTable}>
                <tbody>
                  {slicedLeaderboard.map((entry, index) => (
                    <LeaderboardTableRow
                      ref={
                        index === slicedLeaderboard.length - 1
                          ? lastRowRef
                          : undefined
                      }
                      key={`${entry.id}-${entry.rank}`}
                      rank={entry.rank}
                      name={entry.name}
                      level={entry.level}
                      points={entry.points}
                    />
                  ))}

                  {isFetchingNextPage && (
                    <tr>
                      <td colSpan={4} className={c.loadingRow}>
                        <LoadingSpinner />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
