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

const navigationItems = [
  {
    icon: Like,
    label: 'Moji interesi',
    href: '',
  },
  {
    icon: Award,
    label: 'Moja postignuća',
    href: '',
  },
  {
    icon: Bag,
    label: 'Avatari',
    href: '',
  },
  {
    icon: Trophy,
    label: 'Leaderboard',
    href: '',
  },
  {
    icon: Gift,
    label: 'Nagrade',
    href: '',
  },
  {
    icon: UserEdit,
    label: 'Postavke profila',
    href: RouteNames.PROFILE_SETTINGS,
  },
];

export const ProfilePage = () => {
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
          <LogoutButton />
        </div>
      </main>
    </div>
  );
};
