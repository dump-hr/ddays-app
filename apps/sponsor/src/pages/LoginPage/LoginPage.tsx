import { Helmet } from 'react-helmet';

import logoSvg from '../../assets/images/logo.svg';
import { LoginForm } from '../../components/LoginForm';
import { getPageTitle } from '../../helpers';
import c from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('Login')}</title>
      </Helmet>
      <div className={c.background}>
        <div className={c.formWrapper}>
          <div className={c.backgroundImg}></div>
          <div className={c.formContainer}>
            <div className={c.logoSvg}>
              <svg width={128} height={32}>
                <use href={`${logoSvg}#logo`} />
              </svg>
            </div>
            <h1 className={c.loginTitle}>Prijava u Partners App</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};
