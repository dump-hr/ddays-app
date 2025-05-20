import c from './PasswordResetPage.module.scss';
import { useState, useEffect } from 'react';
import { RouteNames } from '../../router/routes';
import { WelcomeStep } from './steps/WelcomeStep';
import { EmailInputStep } from './steps/EmailInputStep';
import { EmailSentStep } from './steps/EmailSentStep';
import { ValidationRequiredStep } from './steps/ValidationRequiredStep';
import { NewPasswordStep } from './steps/NewPasswordStep';
import { SuccessStep } from './steps/SuccessStep';
import {
  validations,
  validateRepeatedPassword,
} from '../../helpers/validateInput';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '../../api/user/useResetPassword';
import { sendVerificationEmail } from '../../helpers/handleVerificationSent';

export const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const { mutate: resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(
        `/api/email/validate-reset-token?token=${token}`,
      );
      const data = await response.json();

      if (data.valid) {
        setIsValidated(true);
        setStep(4);
      } else {
        alert(data.message);
        navigate(RouteNames.LOGIN);
      }
    } catch (error) {
      console.error('Greška pri validaciji tokena:', error);
      alert('Došlo je do greške pri validaciji tokena');
      navigate(RouteNames.LOGIN);
    }
  };

  const handleNextStep = () => {
    if (step === 4 && isValidated) {
      resetPassword(
        { newPassword, token: token || '' },
        {
          onSuccess: () => {
            setStep(5);
          },
        },
      );
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleVerificationSent = async () => {
    await sendVerificationEmail(email, setEmailError, handleNextStep);
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

    const confirmPasswordError = validateRepeatedPassword(
      newPassword,
      confirmPassword,
    );

    setConfirmPasswordError(confirmPasswordError || '');

    return !passwordError && !confirmPasswordError;
  };

  const validateInputs = () => {
    let isValid = true;

    if (!validations.isNotEmpty(email)) {
      setEmailError('Ispuni sva polja.');
      isValid = false;
    } else if (!validations.isValidEmail(email)) {
      setEmailError('Unesi ispravnu e-mail adresu.');
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
              if (!validateInputs()) {
                return;
              }
              handleVerificationSent();
            }}
          />
        )}
        {step === 3 && <EmailSentStep email={email} />}
        {step === 4 && !isValidated && (
          <ValidationRequiredStep
            onNext={() => {
              setStep(3);
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
