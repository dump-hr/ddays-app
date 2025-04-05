import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Header } from '../components/Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <>
      <Header showDuck={true} />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>U glavi ti je magla?</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
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
