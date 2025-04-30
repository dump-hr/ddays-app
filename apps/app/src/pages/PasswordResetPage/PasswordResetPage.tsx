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
import { useSendEmail } from '../../api/email/useSendEmail';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '../../api/user/useResetPassword';

export const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const { mutate: sendEmail, isLoading } = useSendEmail();
  const { mutate: resetPassword } = useResetPassword();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
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
    try {
      const response = await fetch('/api/email/generate-reset-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.error) {
        setEmailError('Korisnik s ovom email adresom ne postoji.');
        return;
      }

      if (data.token) {
        sendEmail(
          {
            email,
            subject: 'DDays 2025 - Resetiranje lozinke',
            text: `Pozdrav, klikni na link ispod da resetiraš lozinku: http://localhost:3005/app/password-reset/${data.token}`,
          },
          {
            onSuccess: () => {
              handleNextStep();
            },
          },
        );
      }
    } catch (error) {
      console.error('Greška pri generiranju tokena:', error);
      alert('Došlo je do greške pri generiranju tokena');
    }
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
              if (!validateInputs()) {
                return;
              }
              handleVerificationSent();
            }}
          />
        )}
        {step === 3 && (
          <EmailSentStep
            email={email}
            onNext={async () => {
              const tokenFromUrl = new URLSearchParams(location.search).get(
                'token',
              );
              if (tokenFromUrl) {
                await validateToken(tokenFromUrl);
              } else {
                setStep(4);
              }
            }}
          />
        )}
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
