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
import { FourthStepRegistrationForm } from '../FourthStepRegistrationForm';
import { RegistrationStep } from '../../../types/registration/registration.dto';

export const GeneralRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(RegistrationStep.ONE);
  const [isSubmitted, setIsSubmitted] = useState({
    firstStepIsSubmitted: false,
    secondStepIsSubmitted: false,
    thirdStepIsSubmitted: true,
    fourthStepIsSubmitted: true,
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
      case RegistrationStep.ONE:
        setIsSubmitted({ ...isSubmitted, firstStepIsSubmitted: true });
        break;
      case RegistrationStep.TWO:
        setIsSubmitted({ ...isSubmitted, secondStepIsSubmitted: true });
        break;
      case RegistrationStep.THREE:
        setIsSubmitted({ ...isSubmitted, thirdStepIsSubmitted: true });
        break;
      case RegistrationStep.FOUR:
        setIsSubmitted({ ...isSubmitted, fourthStepIsSubmitted: true });
        break;
      default:
        break;
    }
    console.log(isStepValid(currentStep));

    if (
      currentStep === RegistrationStep.THREE ||
      currentStep === RegistrationStep.FOUR
    ) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
    } else if (isStepValid(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
    }
  };

  return (
    <div className={c.generalRegistrationForm}>
      <div className={c.registrationUpper}>
        <h2>
          {currentStep === RegistrationStep.ONE ||
          currentStep === RegistrationStep.TWO
            ? 'Obavezni podatci'
            : currentStep === RegistrationStep.THREE
              ? 'Odaberi svoju slavicu'
              : currentStep === RegistrationStep.FOUR
                ? 'Odaberi svoje interese'
                : ''}
        </h2>

        <ProgressBar
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {currentStep === RegistrationStep.ONE && (
        <FirstStepRegistrationForm
          userData={userData}
          updateUserData={updateUserData}
          isSubmitted={isSubmitted.firstStepIsSubmitted}
        />
      )}
      {currentStep === RegistrationStep.TWO && (
        <SecondStepRegistrationForm
          userData={userData}
          updateUserData={updateUserData}
          isSubmitted={isSubmitted.secondStepIsSubmitted}
        />
      )}

      {/* TODO: Postaviti treći korak */}
      {currentStep === RegistrationStep.THREE && <div>Treći korak</div>}
      {currentStep === RegistrationStep.FOUR && <FourthStepRegistrationForm />}

      <div className={c.buttonsWrapper}>
        {currentStep === RegistrationStep.FOUR ? (
          <Button
            type='submit'
            variant='orange'
            children='Spremi'
            onClick={handleRegistrationClick}
          />
        ) : (
          <>
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
          </>
        )}
      </div>

      <AuthFooter leftMessage='Već imaš račun?' rightMessage='Prijavi se' />
    </div>
  );
};
