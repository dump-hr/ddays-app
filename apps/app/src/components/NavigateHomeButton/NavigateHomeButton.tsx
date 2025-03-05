import { useNavigate } from 'react-router-dom';
import styles from './NavigateHomeButton.module.scss';
import CrossIcon from '../../assets/icons/cross-icon.svg';
import { RouteNames } from '../../router/routes';

const NavigateHomeButton = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(RouteNames.HOME);
  };
  return (
    <div onClick={navigateHome}>
      <img src={CrossIcon} alt='' className={styles.button} />
    </div>
  );
};

export default NavigateHomeButton;
