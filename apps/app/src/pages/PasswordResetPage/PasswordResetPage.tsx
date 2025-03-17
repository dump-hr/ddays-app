import c from './PasswordResetPage.module.scss';
import { useState } from 'react';
import { RouteNames } from '../../router/routes';
import { WelcomeStep } from './components/WelcomeStep';
import { EmailInputStep } from './components/EmailInputStep';
import { EmailSentStep } from './components/EmailSentStep';
import { NewPasswordStep } from './components/NewPasswordStep';
import { SuccessStep } from './components/SuccessStep';

export const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const clearErrors = (field: string) => {
    if (field === 'email') {
      setEmailError('');
    }
  };

  const validateField = (
    value: string,
    minLength: number,
    errorMessage: string,
  ) => {
    if (!value) return 'Hej, trebaš ispuniti sva polja.';
    if (value.length < minLength) return errorMessage;
    return '';
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return 'Lozinke se moraju podudarati.';
    return '';
  };

  const validatePasswords = () => {
    const passwordError = validateField(
      newPassword,
      10,
      'Lozinka mora imati najmanje 10 znakova.',
    );
    setPasswordError(passwordError);

    const confirmPasswordError =
      validateField(confirmPassword, 1, 'Hej, trebaš ispuniti sva polja.') ||
      validatePasswordMatch(newPassword, confirmPassword);
    setConfirmPasswordError(confirmPasswordError);

    return !passwordError && !confirmPasswordError;
  };

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Hej, trebaš ispuniti sva polja.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Hej, unesi ispravnu email adresu.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleClose = () => {
    window.location.href = RouteNames.LOGIN;
  };

  return (
    <div>
      <div className={c.wrapper}>
        {step === 1 && <WelcomeStep onNext={handleNextStep} />}
        {step === 2 && (
          <EmailInputStep
            email={email}
            emailError={emailError}
            onEmailChange={setEmail}
            onClearError={clearErrors}
            onNext={() => {
              if (validateInputs()) {
                handleNextStep();
              }
            }}
          />
        )}
        {step === 3 && <EmailSentStep email={email} onNext={handleNextStep} />}
        {step === 4 && (
          <NewPasswordStep
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            onNewPasswordChange={(value) => {
              setNewPassword(value);
              setPasswordError('');
            }}
            onConfirmPasswordChange={(value) => {
              setConfirmPassword(value);
              setConfirmPasswordError('');
            }}
            onNext={() => {
              if (validatePasswords()) {
                handleNextStep();
              }
            }}
          />
        )}
        {step === 5 && <SuccessStep onClose={handleClose} />}
      </div>
    </div>
  );
};
