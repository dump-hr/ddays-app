import { ConfirmEmail } from '../../components/RegistrationForms/ConfirmEmail';
import c from './ConfirmEmailPage.module.scss';
import { useDeviceType } from '../../hooks/UseDeviceType';
import { SlavicaHeader } from '../../components/RegistrationForms/SlavicaHeader';

export const ConfirmEmailPage = () => {
  const { isMobile } = useDeviceType({});
  console.log(isMobile);

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
