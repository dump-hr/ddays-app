import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Header } from './Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

interface SuccessStepProps {
  onClose: () => void;
}

export const SuccessStep = ({ onClose }: SuccessStepProps) => {
  return (
    <>
      <Header showDuck={true} />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Uspješno promijenjena.</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.textContainer}>
          <p className={c.text}>
            Odlično, nemoj da se ovo ponavlja. Vrati se sad na početnu i prijavi
            se.
          </p>
        </div>
        <div className={c.buttonContainer}>
          <Button variant='orange' onClick={onClose}>
            Zatvori
          </Button>
        </div>
      </div>
    </>
  );
};
