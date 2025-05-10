import { useState, useEffect } from 'react';
import { useUserLogin } from '../../api/auth/useUserLogin';
import { Input } from '../../components/Input';
import c from './LoginPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
//import googleIcon from '../../assets/icons/google.svg';
import { RouteNames } from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '@/helpers/auth';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const { mutate } = useUserLogin(() => navigate(RouteNames.HOME));

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isTokenExpired(accessToken)) {
      navigate(RouteNames.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearErrors = (field: string) => {
    if (field === 'email') {
      setEmailError('');
    } else if (field === 'password') {
      setPasswordError('');
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
    }

    if (!password) {
      setPasswordError('Hej, trebaš ispuniti sva polja.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateInputs()) {
      mutate({ email, password });
    }
  };

  return (
    <div>
      <div className={c.wrapper}>
        <div className={c.pageName}>
          <span className={c.pageTitle}>Prijava</span>
          <a href='https://days.dump.hr'>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </a>
        </div>
        <div className={c.container}>
          <div className={c.titleContainer}>
            <h1 className={c.title}>Dobro došli natrag!</h1>
            <a href='https://days.dump.hr'>
              <img src={closeIcon} alt='Close login' className={c.closeIcon} />
            </a>
          </div>
          <div className={c.formContainer}>
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
            <Input
              label='Lozinka'
              type='password'
              placeholder='Lozinka'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrors('password');
              }}
              error={passwordError}
            />
            <a href={RouteNames.PASSWORD_RESET} className={c.forgotPassword}>
              Zaboravili ste lozinku?
            </a>
          </div>
          <div className={c.buttonContainer}>
            <Button variant='orange' onClick={handleLogin}>
              Prijavi se
            </Button>
            {/*
            <Button variant='black' onClick={() => {}}>
              <div className={c.buttonContent}>
                <img src={googleIcon} alt='icon' className={c.googleIcon} />
                Nastavi s Googleom
              </div>
            </Button>
            */}
          </div>
          <div className={c.registerContainer}>
            <a className={c.noAccount}>Nemaš račun?</a>
            <a href={RouteNames.REGISTER} className={c.registerLink}>
              Registriraj se
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
