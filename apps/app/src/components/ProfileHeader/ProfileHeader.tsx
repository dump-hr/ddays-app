import AvatarPointsCircle from '../AvatarPointsCircle/AvatarPointsCircle';
import { InterestProgressBar } from '../InterestProgressBar';
import c from './ProfileHeader.module.scss';
import TempAvatar from '@/assets/images/temp-avatar.png';

type ProfileHeaderProps = {
  pageHeader: string;
  userNameAndSurname: string;
};
export const ProfileHeader = ({
  pageHeader,
  userNameAndSurname,
}: ProfileHeaderProps) => {
  return (
    <header className={c.header}>
      <div className={c.flexWrapper}>
        <p className={c.title}>
          <span>{pageHeader}</span> <br />
          {userNameAndSurname}
        </p>

        <AvatarPointsCircle points={900} avatar={TempAvatar} />
      </div>

      <div className={c.statsWrapper}>
        <InterestProgressBar label='Programiranje' percentage={50} />
        <InterestProgressBar label='Marketing' percentage={72} />
        <InterestProgressBar label='Product' percentage={22} />
        <InterestProgressBar label='Product' percentage={22} />
      </div>
    </header>
  );
};
