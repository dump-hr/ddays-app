import { useNavigate } from 'react-router-dom';
import ArrowRight from '../../assets/icons/arrow-right-light.svg';
import c from './ProfileNavigationButton.module.scss';

type ProfileNavigationButtonProps = {
  icon: string;
  label: string;
  href: string;
};

const ProfileNavigationButton: React.FC<ProfileNavigationButtonProps> = ({
  icon,
  label,
  href,
}) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(href)} className={c.button}>
      <img src={icon} className={c.icon} />
      <p className={c.label}>{label}</p>
      <img src={ArrowRight} className={c.arrow} />
      <div className={c.dottedBreak} />
    </button>
  );
};

export default ProfileNavigationButton;
