import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Header } from '../components/Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

/*
  Ova se komponenta ne koristi iako je u dizajnu zbog drukcijeg flowa resetiranja lozinke.
  Cuvamo u slucaju da bude potrebna.
*/

interface ValidationRequiredStepProps {
  onNext: () => void;
}

export const ValidationRequiredStep = ({
  onNext,
}: ValidationRequiredStepProps) => {
  return (
    <>
      <Header showDuck={true} />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Uozbilji se.</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.textContainer}>
          <p className={c.text}>
            Niste autorizirali promjenu lozinke u mailu pa molimo da ponovite
            radnju.
          </p>
        </div>
        <div className={c.buttonContainer}>
          <Button variant='orange' onClick={onNext}>
            Pokušaj ponovno
          </Button>
        </div>
      </div>
    </>
  );
};
