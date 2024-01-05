import LoginForm from '../../components/LoginForm';
import c from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={c.background}>
      <div className={c.formWrapper}>
        <div className={c.backgroundImg}></div>
        <div className={c.formContainer}>
          <div className={c.logoSvg}>
            <svg width={128} height={32}>
              <use href={`/logo.svg#logo`} />
            </svg>
          </div>
          <h1 className={c.loginTitle}>Prijava u Partners App</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
