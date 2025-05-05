import c from './ProfileStat.module.scss';
import StarRed from '../../assets/icons/star-red.svg';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { useAchievementGetCompleted } from '@/api/achievement/useAchievementGetCompleted';
import { useAchievementGetAll } from '@/api/achievement/useAchievementGetAll';

type ProfileStatProps = {
  dataType: 'points' | 'achievements';
};

const ProfileStat: React.FC<ProfileStatProps> = ({ dataType }) => {
  const { data: user } = useLoggedInUser();
  const { data: completedAchievements } = useAchievementGetCompleted();
  const { data: allAchievements } = useAchievementGetAll();

  function getLabel() {
    switch (dataType) {
      case 'points':
        return 'Bodovi';
      case 'achievements':
        return 'Postignuća';
      default:
        return '';
    }
  }

  function getValue() {
    switch (dataType) {
      case 'points':
        return (user?.points || 0).toString();
      case 'achievements':
        return `${completedAchievements?.length || 0}/${
          allAchievements?.length || 0
        }`;
      default:
        return '';
    }
  }

  return (
    <div className={c.profileStat}>
      <label className={c.label}>{getLabel()}</label>
      <div className={c.valueWrapper}>
        <p className={c.value}>{getValue()}</p>
        <img src={StarRed} alt='' className={c.star} />
      </div>
    </div>
  );
};

export default ProfileStat;
