import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import AvatarPointsCircle from '../AvatarPointsCircle/AvatarPointsCircle';
import { InterestProgressBar } from '../InterestProgressBar';
import c from './ProfileHeader.module.scss';
import TempAvatar from '@/assets/images/temp-avatar.png';
import { useUserSelectedInterests } from '@/api/interests/useUserSelectedInterests';
import { useInterestsGetAll } from '@/api/interests/useInterestsGetAll';
import { Theme } from '@ddays-app/types';

type ProfileHeaderProps = {
  pageHeader: string;
  userNameAndSurname: string;
};
export const ProfileHeader = ({ pageHeader }: ProfileHeaderProps) => {
  const { data: user } = useLoggedInUser();
  const { data: userInterests } = useUserSelectedInterests(user?.id || 0);
  const { data: interests } = useInterestsGetAll();

  function getPercentage(theme: string) {
    if (interests === undefined || userInterests === undefined) return 0;

    if (userInterests.length === 0) return 0;

    const userInterestsInTheme = userInterests.filter(
      (interest) => interest.theme === theme,
    ).length;

    return Math.round((userInterestsInTheme / userInterests.length) * 100);
  }

  return (
    <header className={c.header}>
      <div className={c.flexWrapper}>
        <p className={c.title}>
          <span>{pageHeader}</span> <br />
          {user?.firstName} {user?.lastName}
        </p>

        <AvatarPointsCircle avatar={user?.profilePhotoUrl || TempAvatar} />
      </div>

      <div className={c.statsWrapper}>
        {Object.values(Theme).map((theme) => (
          <InterestProgressBar
            label={theme}
            percentage={getPercentage(theme)}
            key={theme}
          />
        ))}
      </div>
    </header>
  );
};
