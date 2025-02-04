import { GeneralRegistrationForm } from '../../components/RegistrationForms/GeneralRegistrationForm/GeneralRegistrationForm';
import { RegistrationProvider } from '../../providers/RegistrationContext';
import c from './RegisterPage.module.scss';

export const RegisterPage = () => {
  return (
    <section className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <RegistrationProvider>
          <GeneralRegistrationForm />
        </RegistrationProvider>
      </main>
    </section>
  );
};
