import { GeneralRegistrationForm } from '../../components/RegistrationForms/GeneralRegistrationForm/GeneralRegistrationForm';
import { useDeviceType } from '../../hooks/UseDeviceType';
import { RegistrationProvider } from '../../providers/RegistrationContext';
import c from './RegisterPage.module.scss';
import closeIcon from './../../assets/icons/remove-icon.svg';

export const RegisterPage = () => {
  const { isMobile } = useDeviceType({});
  return (
    <section className={c.page}>
      <header className={c.header}>
        <h2>REGISTRACIJA {!isMobile && <img src={closeIcon}></img>}</h2>
      </header>
      <main className={c.main}>
        <RegistrationProvider>
          <GeneralRegistrationForm />
        </RegistrationProvider>
      </main>
    </section>
  );
};
