import c from './ProfilePage.module.scss';
import TempAvatar from '@/assets/images/temp-avatar.png';
import Like from '@/assets/icons/like.svg';
import Award from '@/assets/icons/award.svg';
import Bag from '@/assets/icons/bag.svg';
import Trophy from '@/assets/icons/trophy.svg';
import Gift from '@/assets/icons/gift.svg';
import UserEdit from '@/assets/icons/user-edit.svg';

import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import ProfileStat from '../../components/ProfileStat';
import ProfileNavigationButton from '../../components/ProfileNavigationButton';
import RecommendationsButton from '../../components/RecommendationsButton';
import FeedbackButton from '../../components/FeedbackButton';
import LogoutButton from '../../components/LogoutButton';
import { RouteNames } from '../../router/routes';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { logout } from '@/helpers/auth';
import { useAchievementGetCompleted } from '@/api/achievement/useAchievementGetCompleted';
import { useAchievementGetAll } from '@/api/achievement/useAchievementGetAll';

const navigationItems = [
  {
    icon: Like,
    label: 'Moji interesi',
    href: RouteNames.PROFILE_INTERESTS,
  },
  {
    icon: Award,
    label: 'Moja postignuća',
    href: RouteNames.PROFILE_ACHIEVEMENTS,
  },
  {
    icon: Bag,
    label: 'Avatari',
    href: RouteNames.PROFILE_AVATARS,
  },
  {
    icon: Trophy,
    label: 'Leaderboard',
    href: RouteNames.PROFILE_LEADERBOARD,
  },
  {
    icon: Gift,
    label: 'Nagrade',
    href: RouteNames.PROFILE_REWARDS,
  },
  {
    icon: UserEdit,
    label: 'Postavke profila',
    href: RouteNames.PROFILE_SETTINGS,
  },
];

export const ProfilePage = () => {
  const { data: user } = useLoggedInUser();
  const { data: completedAchievements } = useAchievementGetCompleted();
  const { data: allAchievements } = useAchievementGetAll();

  return (
    <div className={c.page}>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Profil</span> <br />
            {user?.firstName} {user?.lastName}
          </p>

          <AvatarPointsCircle points={user?.points || 0} avatar={TempAvatar} />
        </div>

        <div className={c.stats}>
          <ProfileStat label='Bodovi' value={user?.points.toString() || '0'} />
          <ProfileStat
            label='Postignuća'
            value={`${completedAchievements?.length || 0}/${
              allAchievements?.length || 0
            }`}
          />
        </div>
      </header>
      <main className={c.main}>
        <div className={c.navigationWrapper}>
          {navigationItems.map((item, index) => (
            <ProfileNavigationButton
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </div>
        <div className={c.buttonsWrapper}>
          <RecommendationsButton />
          <FeedbackButton />
          <LogoutButton onClick={logout} />
        </div>
      </main>
    </div>
  );
};
