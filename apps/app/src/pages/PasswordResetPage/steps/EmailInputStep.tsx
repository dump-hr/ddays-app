import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Header } from '../components/Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

interface EmailInputStepProps {
  email: string;
  emailError: string;
  onEmailChange: (value: string) => void;
  onClearError: (field: string) => void;
  onNext: () => void;
}

export const EmailInputStep = ({
  email,
  emailError,
  onEmailChange,
  onClearError,
  onNext,
}: EmailInputStepProps) => {
  return (
    <>
      <Header />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Upiši svoj email</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.textContainer}>
          <p className={c.text}>
            Upiši email na koji ćemo ti poslati link na tvoju novu lozinku.
          </p>
          <Input
            label='Email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => {
              onEmailChange(e.target.value);
              onClearError('email');
            }}
            error={emailError}
          />
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
