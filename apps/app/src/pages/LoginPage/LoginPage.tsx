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

  return (
    <div>
      <div>
        <h1>Login Page</h1>
      </div>
      <div className={c.container}>
        <div className={c.titleContainer}>
          <h1 className={c.title}>Dobro došli natrag!</h1>
          <img src={closeIcon} alt='Close login' className={c.closeIcon} />
        </div>
        <div className={c.formContainer}>
          <Input
            label='Email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label='Lozinka'
            type='password'
            placeholder='Lozinka'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href={RouteNames.PASSWORD_RESET} className={c.forgotPassword}>
            Zaboravili ste lozinku?
          </a>
        </div>
        <div className={c.buttonContainer}>
          <Button variant='orange' onClick={() => {}}>
            Prijavi se
          </Button>
          <Button variant='black' onClick={() => {}}>
            <img src={googleIcon} alt='icon' className={c.googleIcon} />
            Nastavi s Google
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
  );
};
