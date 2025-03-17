import c from './PasswordResetPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import duckImage from '../../assets/images/duck-image.png';
import { RouteNames } from '../../router/routes';
import { useState } from 'react';
import { Input } from '../../components/Input';

export const PasswordResetPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const clearErrors = (field: string) => {
    if (field === 'email') {
      setEmailError('');
    }
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
      handleNextStep();
    }

    return isValid;
  };

  return (
    <div>
      <div className={c.wrapper}>
        {step === 1 && (
          <>
            <div className={c.pageName}>
              <span className={c.pageTitle}>Resetiraj lozinku</span>
              <a href={RouteNames.LOGIN}>
                <img
                  src={closeIcon}
                  alt='Close login'
                  className={c.closeIcon}
                />
              </a>
            </div>
            <div className={c.duckContainer}>
              <img src={duckImage} alt='Slavica' className={c.duckImage} />
            </div>
            <div className={c.container}>
              <div className={c.titleContainer}>
                <h1 className={c.title}>U glavi ti je magla?</h1>
                <a href={RouteNames.LOGIN}>
                  <img
                    src={closeIcon}
                    alt='Close login'
                    className={c.closeIcon}
                  />
                </a>
              </div>
              <div className={c.textContainer}>
                <p className={c.text}>
                  Opet si zaboravio lozinku? Nema problema, uz moju pomoć odmah
                  ću ti na mail poslati upute za stvaranje nove.
                </p>
              </div>
              <div className={c.buttonContainer}>
                <Button variant='orange' onClick={handleNextStep}>
                  Dalje
                </Button>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className={c.pageName}>
              <span className={c.pageTitle}>Resetiraj lozinku</span>
              <a href={RouteNames.LOGIN}>
                <img
                  src={closeIcon}
                  alt='Close login'
                  className={c.closeIcon}
                />
              </a>
            </div>
            <div className={c.container}>
              <div className={c.titleContainer}>
                <h1 className={c.title}>Upiši svoj email</h1>
                <a href={RouteNames.LOGIN}>
                  <img
                    src={closeIcon}
                    alt='Close login'
                    className={c.closeIcon}
                  />
                </a>
              </div>
              <div className={c.textContainer}>
                <p className={c.text}>
                  Upiši email na koji ćemo ti poslati link na tvoju novu
                  lozinku.
                </p>
                <Input
                  label='Email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearErrors('email');
                  }}
                  error={emailError}
                />
              </div>
              <div className={c.buttonContainer}>
                <Button variant='orange' onClick={validateInputs}>
                  Resetiraj lozinku
                </Button>
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className={c.pageName}>
              <span className={c.pageTitle}>Resetiraj lozinku</span>
              <a href={RouteNames.LOGIN}>
                <img
                  src={closeIcon}
                  alt='Close login'
                  className={c.closeIcon}
                />
              </a>
            </div>
            <div className={c.duckContainer}>
              <img src={duckImage} alt='Slavica' className={c.duckImage} />
            </div>
            <div className={c.container}>
              <div className={c.titleContainer}>
                <h1 className={c.title}>Poslan mail!</h1>
                <a href={RouteNames.LOGIN}>
                  <img
                    src={closeIcon}
                    alt='Close login'
                    className={c.closeIcon}
                  />
                </a>
              </div>
              <div className={c.textContainer}>
                <p className={c.text}>
                  Poslala sam ti link za resetiranje lozinke na
                  {email || 'tvoj email'}. Molim te da prije nastavljanja radnje
                  pratiš upute u mailu i autoriziraš promjenu lozinke.
                </p>
              </div>
              <div className={c.buttonContainer}>
                <Button variant='orange' onClick={handleNextStep}>
                  Resetiraj lozinku
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
