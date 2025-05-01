import { useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { FirstStepRegistrationForm } from '../FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from '../SecondStepRegistrationForm';
import c from './GeneralRegistrationForm.module.scss';
import { AuthFooter } from '@/components//AuthFooter';
import Button from '@/components/Button/Button';
import GoogleIcon from '@/assets/icons/google-icon.svg';
import CloseIcon from '@/assets/icons/black-remove-icon.svg';
import { useRegistration } from '@/providers/RegistrationContext';
import { FourthStepRegistrationForm } from '../FourthStepRegistrationForm';
import { RegistrationStep } from '@/types/registration/registration.dto';
import { useNavigate } from 'react-router-dom';
import { RegistrationDto } from '@/types/user/user';
import { AvatarPickerRegistrationForm } from '../AvatarPickerRegistrationForm';
import { useUserRegister } from '@/api/auth/useUserRegister';
import { RouteNames } from '@/router/routes';

export const GeneralRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(RegistrationStep.ONE);
  const [isSubmitted, setIsSubmitted] = useState({
    firstStepIsSubmitted: false,
    secondStepIsSubmitted: false,
    thirdStepIsSubmitted: false,
    fourthStepIsSubmitted: false,
  });

  const [userData, setUserData] = useState<RegistrationDto>({
    firstName: '',
    lastName: '',
    profilePhotoUrl: '',
    email: '',
    password: '',
    repeatedPassword: '',
    newPassword: '',
    phoneNumber: '',
    birthYear: null,
    educationDegree: null,
    occupation: null,
    newsletterEnabled: false,
    companiesNewsEnabled: false,
    termsAndConditionsEnabled: false,
  });

  const { mutate } = useUserRegister(() => navigate(RouteNames.CONFIRM_EMAIL));
  const navigate = useNavigate();

  const updateUserData = (newData: Partial<RegistrationDto>) => {
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
        mutate({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
          birthYear: userData.birthYear,
          educationDegree: userData.educationDegree,
          occupation: userData.occupation,
          newsletterEnabled: userData.newsletterEnabled,
          companiesNewsEnabled: userData.companiesNewsEnabled,
        });
        break;
      default:
        break;
    }

    goToNextStepIfAllowed();
  };

  const goToNextStepIfAllowed = () => {
    if (
      currentStep === RegistrationStep.THREE ||
      currentStep === RegistrationStep.FOUR
    ) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollToTopOfTheScreen();
    } else if (isStepValid(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollToTopOfTheScreen();
    }
  };

  const displayStepTitle = (currentStep: RegistrationStep) => {
    switch (currentStep) {
      case RegistrationStep.ONE:
      case RegistrationStep.TWO:
        return 'Dovrši svoj profil';
      case RegistrationStep.THREE:
        return 'A tvoja Slavica je... ';
      case RegistrationStep.FOUR:
        return 'Odaberi svoje interese';
      default:
        return '';
    }
  };

  const scrollToTopOfTheScreen = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={c.generalRegistrationForm}>
      <div className={c.registrationUpper}>
        <h2>
          {displayStepTitle(currentStep)}

          <img
            src={CloseIcon}
            onClick={() => navigate('/app')}
            alt='close icon'
            width={20}
            height={20}
          />
        </h2>

        <ProgressBar
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleRegistrationClick={handleRegistrationClick}
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

      {currentStep === RegistrationStep.THREE && (
        <AvatarPickerRegistrationForm updateUserData={updateUserData} />
      )}
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
              children='Dalje'
              onClick={handleRegistrationClick}
            />
            <Button
              type='submit'
              variant='black'
              children='Nastavi s Google'
              icon={GoogleIcon}
            />
          </>
        )}
      </div>

      <AuthFooter leftMessage='Već imaš račun?' rightMessage='Prijavi se' />
    </div>
  );
};
