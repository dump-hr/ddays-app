import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './ProfileAchievementsPage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';
import ProfileStat from '../../components/ProfileStat';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import TabGroup from '../../components/TabGroup';
import Tab from '../../components/Tab';
import { useEffect, useState } from 'react';
import achievements from './achievements';
import AchievementCard from '../../components/AchievementCard';
import { useNavigate } from 'react-router-dom';
import { ACHIEVEMENT_DIFFICULTY } from '@/constants/achievementDifficulty';

export const ProfileAchievementsPage = () => {
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
  const [filteredAchievements, setFilteredAchievements] =
    useState(achievements);

  useEffect(() => {
    if (selectedTab === 'completed') {
      setFilteredAchievements(
        achievements.filter((a) => a.progress === a.goal),
      );
    } else if (selectedTab === 'remaining') {
      setFilteredAchievements(achievements.filter((a) => a.progress < a.goal));
    } else {
      setFilteredAchievements(achievements);
    }
  }, [selectedTab]);

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

    return 'Unknown';
  }

  return (
    <div className={c.page}>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Postignuća</span> <br />
            Marija Gudelj
          </p>

          <AvatarPointsCircle points={900} avatar={TempAvatar} />
        </div>

        <div className={c.stats}>
          <ProfileStat label='Bodovi' value='145' />
          <ProfileStat label='Postignuća' value='3/25' />
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
            <>
              <div className={c.difficultyLabel}>{difficulty}</div>
              <div className={c.achievementsWrapper}>
                {achievementsByDifficulty.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
};
