import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import { useAuthCompanyPasswordLogin } from '../../api/auth/useAuthCompanyPasswordLogin';
import passwordVisibilitySvg from '../../assets/icons/password-visibility.svg';
import { Path } from '../../constants/paths';
import { dataURItoBlobUrl } from '../../helpers';
import c from './LoginForm.module.scss';

const passwordVisibilitySvgUrl = dataURItoBlobUrl(passwordVisibilitySvg);

// TODO: if user hits /sponsor/profile and that redirects to this page
//       this should redirect to that page after login
export const LoginForm = () => {
  const [, navigate] = useLocation();

  const login = useAuthCompanyPasswordLogin(() =>
    navigate(Path.Profile, { replace: true }),
  );

  useEffect(() => {
    const jwt = localStorage.getItem('sponsorAccessToken');
    if (jwt) {
      navigate(Path.Materials, { replace: true });
    }
  }, [navigate]);

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

  const handleVisibilityIconClick = () => {
    setVisibilityIcon(visibilityIcon === 'hidden' ? 'visible' : 'hidden');
  };

  return (
    <form className={c.form} onSubmit={handleSubmit}>
      <input
        type='username'
        name='username'
        placeholder='Korisnicko ime'
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
          disabled={visibilityIcon === 'none'}
          onClick={handleVisibilityIconClick}
          className={c.visibilityButton}
          type='button'>
          <svg width={25} height={23}>
            <use href={`${passwordVisibilitySvgUrl}#${visibilityIcon}`} />
          </svg>
        </button>
      </div>
      <p className={c.formParagraph}>
        Unesite informacije koje ste dobili putem maila
      </p>
      <button type='submit' className={c.formButton}>
        Prijava
      </button>
    </form>
  );
};
