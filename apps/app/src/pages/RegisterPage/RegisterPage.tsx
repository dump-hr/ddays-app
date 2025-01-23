import { ProgressBar } from '../../components/ProgressBar';
import { FirstStepRegistrationForm } from '../../components/RegistrationForms/FirstStepRegistrationForm';

export const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <ProgressBar />
      <FirstStepRegistrationForm />
    </div>
  );
};
