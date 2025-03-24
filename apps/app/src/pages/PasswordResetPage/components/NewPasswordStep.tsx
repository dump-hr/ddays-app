import c from '../PasswordResetPage.module.scss';
import Button from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Header } from './Header';
import closeIcon from '../../../assets/icons/close-icon.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router/routes';

interface NewPasswordStepProps {
  newPassword: string;
  confirmPassword: string;
  passwordError: string;
  confirmPasswordError: string;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onNext: () => void;
}

export const NewPasswordStep = ({
  newPassword,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onNext,
}: NewPasswordStepProps) => {
  return (
    <>
      <Header />
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Upiši novu lozinku</h1>
          <Link to={RouteNames.LOGIN}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.inputContainer}>
          <Input
            label='Lozinka'
            type='password'
            placeholder='Lozinka'
            value={newPassword}
            onChange={(e) => {
              onNewPasswordChange(e.target.value);
            }}
            error={passwordError}
          />
          <Input
            label='Ponovno unesi lozinku'
            type='password'
            placeholder='Ponovno unesi lozinku'
            value={confirmPassword}
            onChange={(e) => {
              onConfirmPasswordChange(e.target.value);
            }}
            error={confirmPasswordError}
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
