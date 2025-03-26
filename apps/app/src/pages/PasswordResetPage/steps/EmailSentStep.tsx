import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Header } from '../components/Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

interface EmailSentStepProps {
  email: string;
  onNext: () => void;
}

export const EmailSentStep = ({ email, onNext }: EmailSentStepProps) => {
  return (
    <>
      <Header showDuck={true} />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Poslan mail!</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
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
