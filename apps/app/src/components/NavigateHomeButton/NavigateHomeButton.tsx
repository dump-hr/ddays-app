import { useNavigate } from 'react-router-dom';
import styles from './NavigateHomeButton.module.scss';
import CloseIcon from '../../assets/icons/close-icon.svg';
import { RouteNames } from '../../router/routes';

const NavigateHomeButton = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(RouteNames.HOME);
  };
  return (
    <div onClick={navigateHome}>
      <img src={CloseIcon} alt='' className={styles.button} />
    </div>
  );
};

export default NavigateHomeButton;
