import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './ProfilePage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';
import ProfileStat from '../../components/ProfileStat';
import Like from '../../assets/icons/like.svg';
import Award from '../../assets/icons/award.svg';
import Bag from '../../assets/icons/bag.svg';
import Trophy from '../../assets/icons/trophy.svg';
import Gift from '../../assets/icons/gift.svg';
import UserEdit from '../../assets/icons/user-edit.svg';
import ProfileNavigationButton from '../../components/ProfileNavigationButton';
import RecommendationsButton from '../../components/RecommendationsButton';
import FeedbackButton from '../../components/FeedbackButton';

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
    href: '',
  },
];

export const ProfilePage = () => {
  return (
    <>
      <header className={c.header}>
        <p className={c.title}>
          <span>Profil</span> <br />
          Marija Gudelj
        </p>

        <div className={c.statsWrapper}>
          <AvatarPointsCircle points={900} avatar={TempAvatar} />
          <div className={c.stats}>
            <ProfileStat label='Bodovi' value='145' />
            <ProfileStat label='Postignuća' value='3/25' />
          </div>
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
        </div>
      </main>
    </>
  );
};
