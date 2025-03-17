import c from '../PasswordResetPage.module.scss';
import closeIcon from '../../../assets/icons/close-icon.svg';
import Button from '../../../components/Button';
import duckImage from '../../../assets/images/duck-image-desktop.png';
import { RouteNames } from '../../../router/routes';

interface ValidationRequiredStepProps {
  onNext: () => void;
}

export const ValidationRequiredStep = ({
  onNext,
}: ValidationRequiredStepProps) => {
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
          <h1 className={c.title}>Uozbilji se.</h1>
          <a href={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </a>
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
