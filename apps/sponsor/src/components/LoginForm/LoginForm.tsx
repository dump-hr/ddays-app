import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'wouter';

import { useLogin } from '../../api/useLogin';
import { Path } from '../../constants/paths';
import c from './LoginForm.module.scss';

const LoginForm = () => {
  const [, navigate] = useLocation();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const login = useLogin(() => navigate(Path.Profile, { replace: true }));

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Invalid email');
      return;
    }

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    login.mutate({
      email: formElements.email.value,
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
        type='email'
        name='email'
        placeholder='Ime tvrtke'
        value={email}
        onChange={handleEmailChange}
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
      <button type='submit' disabled={!isValid} className={c.formButton}>
        Spremi
      </button>
    </form>
  );
};

export default LoginForm;
