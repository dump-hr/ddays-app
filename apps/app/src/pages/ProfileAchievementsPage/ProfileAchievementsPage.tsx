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

  return (
    <div className={c.page}>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Profil</span> <br />
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
        <div className={c.achievementsWrapper}>
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </main>
    </div>
  );
};
