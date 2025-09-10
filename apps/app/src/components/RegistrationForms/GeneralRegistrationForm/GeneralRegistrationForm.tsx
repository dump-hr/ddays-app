import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { FirstStepRegistrationForm } from '../FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from '../SecondStepRegistrationForm';
import c from './GeneralRegistrationForm.module.scss';
import { AuthFooter } from '@/components//AuthFooter';
import Button from '@/components/Button/Button';
import googleIcon from '@/assets/icons/google-icon.svg';
import CloseIcon from '@/assets/icons/black-remove-icon.svg';
import { useRegistration } from '@/providers/RegistrationContext';
import { FourthStepRegistrationForm } from '../FourthStepRegistrationForm';
import { RegistrationStep } from '@/types/registration/registration.dto';
import { useLocation, useNavigate } from 'react-router-dom';
import { AvatarPickerRegistrationForm } from '../AvatarPickerRegistrationForm';
import { useUserRegister } from '@/api/auth/useUserRegister';
import { RouteNames } from '@/router/routes';
import { useRegistrationData } from '@/providers/RegistrationDataProvider';
import toast from 'react-hot-toast';
import RedStarIcon from '@/components/RedStarIcon';
import { GOOGLE_CLIENT_ID } from '@/constants/googleId';
import { isTokenExpired } from '@/helpers/auth';
import { useGoogleAuthLogin } from '@/api/auth/useGoogleAuthLogin';

export const GeneralRegistrationForm = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(RegistrationStep.ONE);
  const [isSubmitted, setIsSubmitted] = useState({
    firstStepIsSubmitted: false,
    secondStepIsSubmitted: false,
    thirdStepIsSubmitted: false,
    fourthStepIsSubmitted: false,
  });
  const [googleAuth, setGoogleAuth] = useState(false);

  const { userData, updateUserData, clearUserData } = useRegistrationData();

  const { mutate } = useUserRegister(() => {
    clearUserData();

    if (googleAuth) {
      navigate(RouteNames.HOME);
    } else {
      navigate(RouteNames.CONFIRM_EMAIL);
    }
  });
  const { mutate: mutateGoogle } = useGoogleAuthLogin();

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isTokenExpired(accessToken)) {
      navigate(RouteNames.HOME);
    }

    if (window.google && !window.googleInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.googleInitialized = true;
    }
  }, [navigate]);

  const handleCredentialResponse = (response: { credential: string }) => {
    if (response.credential) {
      mutateGoogle(response.credential);
    } else {
      toast.error('Google login failed!');
    }
  };

  useEffect(() => {
    if (location.state?.profilePhotoUrl) {
      updateUserData({
        profilePhotoUrl: location.state.profilePhotoUrl,
      });
      setCurrentStep(RegistrationStep.FOUR);
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate, updateUserData]);

  useEffect(() => {
    if (location.state?.startStep) setCurrentStep(location.state.startStep);

    if (location.state?.googleAuth) setGoogleAuth(true);

    if (location.state?.userData) updateUserData(location.state.userData);

    navigate(location.pathname, { replace: true });
  }, [location.state, navigate, updateUserData, location.pathname]);

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

        if (userData.newsletterEnabled) {
          toast.success("Dodano postignuće - What's new?", {
            icon: <RedStarIcon />,
            duration: 3000,
            position: 'top-center',
          });
        }

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
          interests: userData.interests,
          profilePhotoUrl: userData.profilePhotoUrl,
        });

        break;
      default:
        break;
    }

    goToNextStepIfAllowed();
  };

  const goToNextStepIfAllowed = () => {
    if (googleAuth && currentStep === RegistrationStep.ONE) {
      setCurrentStep(RegistrationStep.TWO);
      scrollToTopOfTheScreen();
      return;
    }
    if (
      currentStep === RegistrationStep.THREE ||
      currentStep === RegistrationStep.FOUR
    ) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep > 4 ? 4 : nextStep);

      if (nextStep <= 4) scrollToTopOfTheScreen();
    } else if (isStepValid(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep > 4 ? 4 : nextStep);
      if (nextStep <= 4) scrollToTopOfTheScreen();
    }
  };

  const displayStepTitle = (currentStep: RegistrationStep) => {
    switch (currentStep) {
      case RegistrationStep.ONE:
        return 'Obavezni podatci';
      case RegistrationStep.TWO:
        return 'Dovrši svoj profil';
      case RegistrationStep.THREE:
        return 'A tvoja patkica je... ';
      case RegistrationStep.FOUR:
        return 'Odaberi svoje interese';
      default:
        return '';
    }
  };

  const scrollToTopOfTheScreen = () => {
    window.scrollTo(0, 0);
  };

  const handleCustomGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      toast.error('Google login not initialized');
    }
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
          setCurrentStep={(step) => {
            if (googleAuth && step === RegistrationStep.ONE) return;
            setCurrentStep(step);
          }}
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
          isGoogleAuth={googleAuth}
        />
      )}

      {currentStep === RegistrationStep.THREE && (
        <AvatarPickerRegistrationForm updateUserData={updateUserData} />
      )}
      {currentStep === RegistrationStep.FOUR && (
        <FourthStepRegistrationForm
          userData={userData}
          updateUserData={updateUserData}
        />
      )}

      <div className={c.buttonsWrapper}>
        {currentStep === RegistrationStep.FOUR ? (
          <Button
            type='submit'
            variant='orange'
            children='Spremi'
            onClick={handleRegistrationClick}
          />
        ) : currentStep !== RegistrationStep.THREE ? (
          <>
            <Button
              type='submit'
              variant='orange'
              children='Dalje'
              onClick={handleRegistrationClick}
            />

            {currentStep === RegistrationStep.ONE ? (
              <Button
                type='submit'
                variant='black'
                children='Nastavi s Google'
                icon={googleIcon}
                onClick={handleCustomGoogleLogin}
              />
            ) : null}
          </>
        ) : null}
      </div>

      <AuthFooter
        leftMessage='Već imaš račun?'
        rightMessage='Prijavi se'
        rightMessageOnClick={() => navigate(RouteNames.LOGIN)}
      />
    </div>
  );
};
