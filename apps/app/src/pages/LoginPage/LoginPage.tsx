import { Input } from '../../components/Input';
import { useState } from 'react';
import c from './LoginPage.module.scss';
import closeIcon from '../../assets/icons/Group.svg';
import Button from '../../components/Button';
import googleIcon from '../../assets/icons/google.svg';
import { RouteNames } from '../../router/routes';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Hej, trebaš ispuniti sva polja.');
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
      console.log('Logging in');
    }
  };

  return (
    <div>
      <div className={c.wrapper}>
        <div className={c.blackDiv}>
          <h1 className={c.pageName}>Prijava</h1>
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
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
            <Input
              label='Lozinka'
              type='password'
              placeholder='Lozinka'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button variant='black' onClick={() => {}}>
              <div className={c.buttonContent}>
                <img src={googleIcon} alt='icon' className={c.googleIcon} />
                Nastavi s Google
              </div>
            </Button>
          </div>
          <div className={c.registerContainer}>
            <span className={c.noAccount}>Nemaš račun?</span>
            <a href={RouteNames.REGISTER} className={c.registerLink}>
              Registriraj se
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
