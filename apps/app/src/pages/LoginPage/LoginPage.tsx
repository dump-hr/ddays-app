import { Input } from '../../components/Input';
import c from './LoginPage.module.scss';
import closeIcon from '../../assets/icons/Group.svg';

export const LoginPage = () => {
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
            value=''
            onChange={() => {}}
          />
          <Input
            label='Lozinka'
            type='password'
            placeholder='Lozinka'
            value=''
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
