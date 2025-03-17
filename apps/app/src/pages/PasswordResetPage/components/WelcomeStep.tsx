import c from '../PasswordResetPage.module.scss';
import closeIcon from '../../../assets/icons/close-icon.svg';
import Button from '../../../components/Button';
import duckImage from '../../../assets/images/duck-image.png';
import { RouteNames } from '../../../router/routes';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
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
          <h1 className={c.title}>U glavi ti je magla?</h1>
          <a href={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </a>
        </div>
        <div className={c.textContainer}>
          <p className={c.text}>
            Opet si zaboravio lozinku? Nema problema, uz moju pomoć odmah ću ti
            na mail poslati upute za stvaranje nove.
          </p>
        </div>
        <div className={c.buttonContainer}>
          <Button variant='orange' onClick={onNext}>
            Dalje
          </Button>
        </div>
      </div>
    </>
  );
};
