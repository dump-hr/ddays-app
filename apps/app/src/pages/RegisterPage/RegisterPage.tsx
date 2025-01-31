import { GeneralRegistrationForm } from '../../components/RegistrationForms/GeneralRegistrationForm/GeneralRegistrationForm';
import { RegistrationProvider } from '../../providers/RegistrationContext';

export const RegisterPage = () => {
  return (
    <div>
      <RegistrationProvider>
        <GeneralRegistrationForm />
      </RegistrationProvider>
    </div>
  );
};
