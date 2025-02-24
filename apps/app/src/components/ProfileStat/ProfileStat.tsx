import c from './ProfileStat.module.scss';
import StarRed from '../../assets/icons/star-red.svg';

type ProfileStatProps = {
  label: string;
  value: string;
};

const ProfileStat: React.FC<ProfileStatProps> = ({ label, value }) => {
  return (
    <div className={c.profileStat}>
      <label className={c.label}>{label}</label>
      <div className={c.valueWrapper}>
        <p className={c.value}>{value}</p>
        <img src={StarRed} alt='' className={c.star} />
      </div>
    </div>
  );
};

export default ProfileStat;
