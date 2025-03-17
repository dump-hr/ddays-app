import c from '../PasswordResetPage.module.scss';
import closeIcon from '../../../assets/icons/close-icon.svg';
import Button from '../../../components/Button';
import duckImage from '../../../assets/images/duck-image.png';
import { RouteNames } from '../../../router/routes';

interface EmailSentStepProps {
  email: string;
  onNext: () => void;
}

export const EmailSentStep = ({ email, onNext }: EmailSentStepProps) => {
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
          <h1 className={c.title}>Poslan mail!</h1>
          <a href={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </a>
        </div>
        <div className={c.textContainer}>
          <p className={c.text}>
            Poslala sam ti link za resetiranje lozinke na{' '}
            {email || 'tvoj email'}. Molim te da prije nastavljanja radnje
            pratiš upute u mailu i autoriziraš promjenu lozinke.
          </p>
        </div>
        <div className={c.buttonContainer}>
          <Button variant='orange' onClick={onNext}>
            Resetiraj lozinku
          </Button>
        </div>
      </div>
    </>
  );
};
