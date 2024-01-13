import { useState } from 'react';
import { useLocation } from 'wouter';

import { useLogin } from '../../api/useLogin';
import { Path } from '../../constants/paths';
import c from './LoginForm.module.scss';

const LoginForm = () => {
  const [, navigate] = useLocation();

  const [username, setUsername] = useState('');

  const login = useLogin(() => navigate(Path.Home, { replace: true }));

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;

    setUsername(newUsername);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };

    login.mutate({
      username: formElements.username.value,
      password: formElements.password.value,
    });
  };

  const [visibilityIcon, setVisibilityIcon] = useState<
    'none' | 'visible' | 'hidden'
  >('none');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setVisibilityIcon('none');
      return;
    }

    if (visibilityIcon === 'none') {
      setVisibilityIcon('hidden');
      return;
    }
  };

  const handleVisibilityIconClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (visibilityIcon === 'hidden') {
      setVisibilityIcon('visible');
    } else {
      setVisibilityIcon('hidden');
    }
  };

  return (
    <form className={c.form} onSubmit={handleSubmit}>
      <input
        type='username'
        name='username'
        placeholder='Ime tvrtke'
        value={username}
        onChange={handleUsernameChange}
        className={c.formInput}
      />
      <div className={c.passwordInputContainer}>
        <input
          type={visibilityIcon === 'visible' ? 'text' : 'password'}
          name='password'
          placeholder='Lozinka'
          className={c.formInput}
          onChange={handlePasswordChange}
        />
        <button
          onClick={handleVisibilityIconClick}
          className={c.visibilityButton}
          type='button'>
          <svg width={128} height={32}>
            <use href={`/password-visibility.svg#${visibilityIcon}`} />
          </svg>
        </button>
      </div>
      <p className={c.formParagraph}>
        Unesite informacije koje ste dobili putem maila
      </p>
      <button type='submit' className={c.formButton}>
        Spremi
      </button>
    </form>
  );
};

export default LoginForm;
