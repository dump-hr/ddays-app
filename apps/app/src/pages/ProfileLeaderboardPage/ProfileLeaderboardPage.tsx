import { useNavigate } from 'react-router-dom';
import styles from './ProfileLeaderboardPage.module.scss';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import TopRanking from './sections/TopRanking';
import LeaderboardTable from './sections/LeaderboardTable';
import WhiteArrowLeft from '@/assets/icons/arrow-left-white.svg';
import { useAchievementCompleteByName } from '@/api/achievement/useAchievementCompleteByName';
import { AchievementNames } from '@ddays-app/types';

export const ProfileLeaderboardPage = () => {
  const navigate = useNavigate();

  const { mutate: completeAchievementByName } = useAchievementCompleteByName();
  completeAchievementByName({ name: AchievementNames.BraveMove });

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
          <img
            src={ArrowLeft}
            alt='Back'
            className={styles.arrowLeft}
            onClick={() => navigate(-1)}
          />
          <h3 className={styles.title}>Leaderboard</h3>
        </header>
        <div className={styles.flexWrapper}>
          <TopRanking />
          <LeaderboardTable />
        </div>
      </main>
    </div>
  );
};
