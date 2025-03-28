import { ConfirmEmail } from '../../components/RegistrationForms/ConfirmEmail';
import c from './ConfirmEmailPage.module.scss';
import { SlavicaHeader } from '../../components/RegistrationForms/SlavicaHeader';

export const ConfirmEmailPage = () => {
  return (
    <section className={c.page}>
      <header className={c.header}>
        <SlavicaHeader />
      </header>
      <main className={c.main}>
        <ConfirmEmail />
      </main>
    </section>
  );
};
