import c from './PasswordResetPage.module.scss';
import { useState } from 'react';
import { RouteNames } from '../../router/routes';
import { WelcomeStep } from './steps/WelcomeStep';
import { EmailInputStep } from './steps/EmailInputStep';
import { EmailSentStep } from './steps/EmailSentStep';
import { ValidationRequiredStep } from './steps/ValidationRequiredStep';
import { NewPasswordStep } from './steps/NewPasswordStep';
import { SuccessStep } from './steps/SuccessStep';
import { validations, validateField } from '../../helpers/validateInput';
import { UserDataFields } from '@/types/enums';

export const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isValidated, setIsValidated] = useState(false); // ValidationRequiredStep/NewPasswordStep - ovisno o tome je li korisnik validirao link

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const clearErrors = (field: string) => {
    if (field === 'email') {
      setEmailError('');
    }
  };

  const validatePasswords = () => {
    const passwordError = !validations.isValidPassword(newPassword)
      ? 'Lozinka mora imati najmanje 8 znakova i broj.'
      : '';
    setPasswordError(passwordError);

    const confirmPasswordError = validateField(
      UserDataFields.RepeatedPassword,
      confirmPassword,
      { newPassword },
    );
    setConfirmPasswordError(confirmPasswordError || '');

    return !passwordError && !confirmPasswordError;
  };

  const validateInputs = () => {
    let isValid = true;

    if (!validations.isNotEmpty(email)) {
      setEmailError('Hej, trebaš ispuniti sva polja.');
      isValid = false;
    } else if (!validations.isValidEmail(email)) {
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
        {step === 4 && !isValidated && (
          <ValidationRequiredStep
            onNext={() => {
              setIsValidated(true);
            }}
          />
        )}
        {step === 4 && isValidated && (
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
