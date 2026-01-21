import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { FirstStepRegistrationForm } from '../FirstStepRegistrationForm';
import { SecondStepRegistrationForm } from '../SecondStepRegistrationForm';
import c from './GeneralRegistrationForm.module.scss';
import { AuthFooter } from '@/components/AuthFooter';
import Button from '@/components/Button/Button';
import googleIcon from '@/assets/icons/google-icon.svg';
import CloseIcon from '@/assets/icons/black-remove-icon.svg';
import { useRegistration } from '@/providers/RegistrationContext';
import { FourthStepRegistrationForm } from '../FourthStepRegistrationForm';
import { RegistrationStep } from '@/types/registration/registration.dto';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep =
    (Number(searchParams.get('step')) as RegistrationStep) ||
    RegistrationStep.ONE;
  const googleAuth = searchParams.get('googleAuth') === 'true';

  const setCurrentStep = (step: RegistrationStep) => {
    setSearchParams(
      (prev) => {
        prev.set('step', step.toString());
        return prev;
      },
      { replace: true },
    );
  };



  const [isSubmitted, setIsSubmitted] = useState({
    firstStepIsSubmitted: false,
    secondStepIsSubmitted: false,
    thirdStepIsSubmitted: false,
    fourthStepIsSubmitted: false,
  });

  const { userData, updateUserData, clearUserData } = useRegistrationData();
  const { mutate } = useUserRegister(() => {
    clearUserData();
    navigate(googleAuth ? RouteNames.HOME : RouteNames.CONFIRM_EMAIL);
  });
  const { mutate: mutateGoogle } = useGoogleAuthLogin();
  const { isStepValid } = useRegistration();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isTokenExpired(accessToken)) {
      navigate(RouteNames.HOME);
      return;
    }

    if (window.google && !window.googleInitialized) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        use_fedcm_for_prompt: true,
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

  const handleCustomGoogleLogin = () => {
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        const redirectUri = `${window.location.origin}/app/google-callback`;

        const params = new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID,
          redirect_uri: redirectUri,
          response_type: 'id_token',
          scope: 'email profile',
          nonce: Date.now().toString(),
        });
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      }
    });
  };

  useEffect(() => {
    const isGoogleAuth = googleAuth || location.state?.googleAuth === true;
    if (isGoogleAuth) {
      localStorage.setItem('ddays_registration_is_google', 'true');
    }
  }, [googleAuth, location.state?.googleAuth]);

  useEffect(() => {
    if (
      !location.state ||
      (typeof location.state === 'object' &&
        Object.keys(location.state).length === 0)
    ) {
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    let hasUpdates = false;

    if (location.state.profilePhotoUrl) {
      updateUserData({ profilePhotoUrl: location.state.profilePhotoUrl });
      newParams.set('step', RegistrationStep.FOUR.toString());
      hasUpdates = true;
    }
    if (location.state.startStep) {
      newParams.set('step', location.state.startStep.toString());
      hasUpdates = true;
    }
    if (location.state.googleAuth) {
      newParams.set('googleAuth', 'true');
      hasUpdates = true;
    }
    if (location.state.userData) {
      const incomingData = location.state.userData;
      const cleanData = Object.fromEntries(
        Object.entries(incomingData).filter((entry) => entry[1] !== null && entry[1] !== ''),
      );
      updateUserData(cleanData);
      hasUpdates = true;
    }

    if (hasUpdates) {
      setSearchParams(newParams, { replace: true, state: null });
    }
  }, [location.state, updateUserData, setSearchParams, searchParams]);

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
          dto: { ...userData },
          isFromGoogleAuth: googleAuth,
        });
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

    const nextStep = currentStep + 1;
    if (isStepValid(currentStep) || currentStep >= RegistrationStep.THREE) {
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
            onClick={handleRegistrationClick}>
            Spremi
          </Button>
        ) : currentStep !== RegistrationStep.THREE ? (
          <>
            <Button
              type='submit'
              variant='orange'
              onClick={handleRegistrationClick}>
              Dalje
            </Button>
            {currentStep === RegistrationStep.ONE && (
              <Button
                type='submit'
                variant='black'
                icon={googleIcon}
                onClick={handleCustomGoogleLogin}>
                Nastavi s Google
              </Button>
            )}
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
