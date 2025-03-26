import c from '../PasswordResetPage.module.scss';
import closeIcon from '../../../assets/icons/close-icon.svg';
import duckImage from '../../../assets/images/duck-image-desktop.png';
import { RouteNames } from '../../../router/routes';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showDuck?: boolean;
}

export const Header = ({ showDuck = false }: HeaderProps) => {
  return (
    <>
      <div className={c.pageName}>
        <span className={c.pageTitle}>Resetiraj lozinku</span>
        <Link to={RouteNames.LOGIN}>
          <img src={closeIcon} alt='Close login' className={c.closeIcon} />
        </Link>
      </div>
      {showDuck && (
        <div className={c.duckContainer}>
          <img src={duckImage} alt='Slavica' className={c.duckImage} />
        </div>
      )}
    </>
  );
};
