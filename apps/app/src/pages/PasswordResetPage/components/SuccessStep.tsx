import c from '../PasswordResetPage.module.scss';
import closeIcon from '../../../assets/icons/close-icon.svg';
import Button from '../../../components/Button';
import duckImage from '../../../assets/images/duck-image.png';
import { RouteNames } from '../../../router/routes';

interface SuccessStepProps {
  onClose: () => void;
}

export const SuccessStep = ({ onClose }: SuccessStepProps) => {
  return (
    <>
      <div className={c.pageName}>
        <span className={c.pageTitle}>Resetiraj lozinku</span>
        <a href={RouteNames.LOGIN}>
          <img src={closeIcon} alt='Close login' className={c.closeIcon} />
        </a>
      </div>
      <div className={c.duckContainer}>
        <img src={duckImage} alt='Slavica' className={c.duckImage} />
      </div>
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Uspješno promijenjena.</h1>
          <a href={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </a>
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
