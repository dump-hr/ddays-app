import LoginForm from '../../components/LoginForm';
import c from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={c.background}>
      <div className={c.formWrapper}>
        <div className={c.backgroundImg}></div>
        <div className={c.formContainer}>
          <svg>
            <use href={`/logo.svg#logo`} />
          </svg>
          <h1 className={c.loginTitle}>Prijava u Partners App</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
