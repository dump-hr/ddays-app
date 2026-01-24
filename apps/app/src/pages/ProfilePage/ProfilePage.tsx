import c from './ProfilePage.module.scss';
import TempAvatar from '@/assets/images/temp-avatar.png';
import Like from '@/assets/icons/like.svg';
import Award from '@/assets/icons/award.svg';
import Bag from '@/assets/icons/bag.svg';
import Trophy from '@/assets/icons/trophy.svg';
import Gift from '@/assets/icons/gift.svg';
import UserEdit from '@/assets/icons/user-edit.svg';
import Ticket from '@/assets/icons/ticket.svg';

import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import ProfileStat from '../../components/ProfileStat';
import ProfileNavigationButton from '../../components/ProfileNavigationButton';
import RecommendationsButton from '../../components/RecommendationsButton';
import LogoutButton from '../../components/LogoutButton';
import { RouteNames } from '../../router/routes';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { logout } from '@/helpers/auth';

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
    icon: Ticket,
    label: 'Moj kod',
    href: RouteNames.PROFILE_INVITE_CODE,
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

  return (
    <div className={c.page}>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Profil</span> <br />
            {user?.firstName} {user?.lastName}
          </p>

          <AvatarPointsCircle avatar={user?.profilePhotoUrl || TempAvatar} />
        </div>

        <div className={c.stats}>
          <ProfileStat dataType='points' />
          <ProfileStat dataType='achievements' />
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
          {/*<FeedbackButton /> */}

          <LogoutButton onClick={logout} />
        </div>
      </main>
    </div>
  );
};
