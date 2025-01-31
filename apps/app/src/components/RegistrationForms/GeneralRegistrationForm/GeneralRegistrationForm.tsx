import { useState } from 'react';
import { ProgressBar } from '../../ProgressBar';
import { FirstStepRegistrationForm } from '../FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from '../SecondStepRegistrationForm';
import c from './GeneralRegistrationForm.module.scss';
import { AuthFooter } from '../../AuthFooter';
import Button from '../../Button/Button';
import googleIcon from './../../../assets/icons/google-icon.svg';
import { UserData } from '../../../types/user/user.dto';
import { useRegistration } from '../../../providers/RegistrationContext';

export const GeneralRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState({
    firstStepIsSubmitted: false,
    secondStepIsSubmitted: false,
    thirdStepIsSubmitted: false,
    fourthStepIsSubmitted: false,
  });

  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatedPassword: '',
    phoneNumber: '',
    birthYear: null,
    educationDegree: null,
    occupation: null,
    newsletterEnabled: false,
    companiesNewsEnabled: false,
    termsAndConditionsEnabled: false,
  });

  const updateUserData = (newData: Partial<UserData>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const { isStepValid } = useRegistration();

  const handleRegistrationClick = () => {
    switch (currentStep) {
      case 1:
        setIsSubmitted({ ...isSubmitted, firstStepIsSubmitted: true });
        break;
      case 2:
        setIsSubmitted({ ...isSubmitted, secondStepIsSubmitted: true });
        break;
      case 3:
        setIsSubmitted({ ...isSubmitted, thirdStepIsSubmitted: true });
        break;
      case 4:
        setIsSubmitted({ ...isSubmitted, fourthStepIsSubmitted: true });
        break;
      default:
        break;
    }
    if (isStepValid(currentStep)) {
      let nextStep = currentStep + 1;
      setCurrentStep(nextStep);
    }
  };

  return (
    <div className={c.generalRegistrationForm}>
      <div className={c.registrationUpper}>
        <h2>Obavezni podatci</h2>
        <ProgressBar
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {currentStep === 1 && (
        <FirstStepRegistrationForm
          userData={userData}
          updateUserData={updateUserData}
          isSubmitted={isSubmitted.firstStepIsSubmitted}
        />
      )}
      {currentStep === 2 && (
        <SecondStepRegistrationForm
          userData={userData}
          updateUserData={updateUserData}
          isSubmitted={isSubmitted.secondStepIsSubmitted}
        />
      )}

      {/* TODO: Postaviti treći i četvrti korak */}
      {currentStep === 3 && <div>Treći korak</div>}
      {currentStep === 4 && <div>Četvrti korak</div>}

      <div className={c.buttonsWrapper}>
        <Button
          type='submit'
          variant='orange'
          children='Registriraj se'
          onClick={handleRegistrationClick}
        />
        <Button
          type='submit'
          variant='black'
          children='Nastavi s Google'
          icon={googleIcon}
        />
      </div>

      <AuthFooter leftMessage='Već imaš račun?' rightMessage='Prijavi se' />
    </div>
  );
};
