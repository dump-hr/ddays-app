import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './ProfileAchievementsPage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';
import ProfileStat from '../../components/ProfileStat';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import TabGroup from '../../components/TabGroup';
import Tab from '../../components/Tab';
import { useEffect, useState } from 'react';
import AchievementCard from '../../components/AchievementCard';
import { useNavigate } from 'react-router-dom';
import { ACHIEVEMENT_DIFFICULTY } from '@/constants/achievementDifficulty';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { useAchievementGetAll } from '@/api/achievement/useAchievementGetAll';
import { useAchievementGetCompleted } from '@/api/achievement/useAchievementGetCompleted';
import { AchievementDto } from '@ddays-app/types';
import Button from '@/components/Button';

export const ProfileAchievementsPage = () => {
  const { data: user } = useLoggedInUser();
  const { data: achievements } = useAchievementGetAll();
  const { data: completedAchievements } = useAchievementGetCompleted();

  const tabs = [
    {
      id: 'all',
      label: 'Sve',
    },
    {
      id: 'completed',
      label: 'Dovršeno',
    },
    {
      id: 'remaining',
      label: 'Preostalo',
    },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [filteredAchievements, setFilteredAchievements] = useState(
    achievements || [],
  );

  useEffect(() => {
    if (!achievements) return;
    if (!completedAchievements) return;

    if (selectedTab === 'completed') {
      setFilteredAchievements(completedAchievements);
    } else if (selectedTab === 'remaining') {
      setFilteredAchievements(
        achievements.filter(
          (a) => !completedAchievements.some((c) => c.id === a.id),
        ),
      );
    } else {
      setFilteredAchievements(achievements);
    }
  }, [selectedTab, achievements, completedAchievements]);

  const navigate = useNavigate();

  function getAchievementDifficulty(points: number): string {
    const thresholds = Object.entries(ACHIEVEMENT_DIFFICULTY)
      .map(([key, label]) => ({ max: Number(key), label }))
      .sort((a, b) => a.max - b.max);

    for (const { max, label } of thresholds) {
      if (points <= max) {
        return label;
      }
    }

    return 'UNKNOWN';
  }

  function isAchievementCompleted(achievement: AchievementDto): boolean {
    return completedAchievements?.some((a) => a.id === achievement.id) || false;
  }

  return (
    <div className={c.page}>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Postignuća</span> <br />
            {user?.firstName} {user?.lastName}
          </p>

          <AvatarPointsCircle avatar={TempAvatar} />
        </div>

        <div className={c.stats}>
          <ProfileStat dataType='points' />
          <ProfileStat dataType='achievements' />
        </div>
      </header>
      <main className={c.main}>
        <header className={c.mainHeader}>
          <img
            src={ArrowLeft}
            alt=''
            className={c.arrowLeft}
            onClick={() => navigate(-1)}
          />
          <h3 className={c.title}>Postignuća</h3>
        </header>

        <Button
          style={{ marginTop: '24px' }}
          variant='beige'
          onClick={() => navigate('/app/scanner')}>
          Skeniraj QR kod
        </Button>
        <TabGroup setter={setSelectedTab} className={c.tabGroup}>
          {tabs.map((tab) => (
            <Tab key={tab.id} id={tab.id}>
              {tab.label}
            </Tab>
          ))}
        </TabGroup>

        {Object.values(ACHIEVEMENT_DIFFICULTY).map((difficulty) => {
          const achievementsByDifficulty = filteredAchievements.filter(
            (achievement) =>
              getAchievementDifficulty(achievement.points || 0) === difficulty,
          );

          if (achievementsByDifficulty.length === 0) return null;

          return (
            <div key={difficulty}>
              <div className={c.difficultyLabel}>{difficulty}</div>
              <div className={c.achievementsWrapper}>
                {achievementsByDifficulty.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    isCompleted={isAchievementCompleted(achievement)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};
