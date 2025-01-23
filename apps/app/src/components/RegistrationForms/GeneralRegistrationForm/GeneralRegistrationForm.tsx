import { useState } from 'react';
import { ProgressBar } from '../../ProgressBar';
import { FirstStepRegistrationForm } from '../FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from '../SecondStepRegistrationForm';
import c from './GeneralRegistrationForm.module.scss';

export const GeneralRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className={c.generalRegistrationForm}>
      <div className={c.registrationUpper}>
        <h2>Obavezni podatci</h2>
        <ProgressBar
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      {currentStep === 1 && <FirstStepRegistrationForm />}
      {currentStep === 2 && <SecondStepRegistrationForm />}

      {/*TODO postavit ovdje treći i četvrti korak*/}
      {currentStep === 3 && <FirstStepRegistrationForm />}
      {currentStep === 4 && <SecondStepRegistrationForm />}
    </div>
  );
};
