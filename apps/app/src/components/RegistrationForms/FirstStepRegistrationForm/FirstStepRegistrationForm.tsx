import { ChangeEvent, useEffect } from 'react';
import { Input } from '@/components/Input';
import c from './FirstStepRegistrationForm.module.scss';
import { RegistrationFormErrors } from '@/types/errors/errors.dto';
import {
  allFieldsAreFilled,
  validateField,
  validateRepeatedPassword,
} from '@/helpers/validateInput';
import { UserDataFields } from '@/types/enums';
import { useRegistration } from '@/providers/RegistrationContext';
import { CheckboxFieldsWrapper } from '../CheckboxFieldsWrapper';
import { RegistrationStep } from '@/types/registration/registration.dto';
import { RegistrationDto } from '@ddays-app/types';

type Props = {
  userData: Partial<RegistrationDto>;
  updateUserData: (newData: Partial<RegistrationDto>) => void;
  isSubmitted: boolean;
};

export const FirstStepRegistrationForm = ({
  userData,
  updateUserData,
  isSubmitted,
}: Props) => {
  const { errors, clearStepErrors, setStepErrors } = useRegistration();

  const firstStepFields: (keyof RegistrationDto)[] = [
    UserDataFields.FirstName,
    UserDataFields.LastName,
    UserDataFields.Email,
    UserDataFields.Password,
    UserDataFields.RepeatedPassword,
    UserDataFields.NewsletterEnabled,
    UserDataFields.CompaniesNewsEnabled,
    UserDataFields.TermsAndConditionsEnabled,
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const validateFirstStep = () => {
    const newErrors: Partial<RegistrationFormErrors> = {};

    firstStepFields.forEach((key) => {
      const error = validateField(key, userData[key] as string);
      newErrors[key] = error || '';
    });

    const passwordsMatchError = validateRepeatedPassword(
      userData.password,
      userData.repeatedPassword,
    );

    if (passwordsMatchError) {
      newErrors.repeatedPassword = passwordsMatchError;
    }

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(RegistrationStep.ONE, newErrors);
    } else {
      clearStepErrors(RegistrationStep.ONE);
    }
  };

  useEffect(() => {
    if (isSubmitted || allFieldsAreFilled(firstStepFields, userData)) {
      validateFirstStep();
    }
  }, [isSubmitted, userData]);

  return (
    <>
      <div className={c.inputFieldsWrapper}>
        <Input
          name={UserDataFields.FirstName}
          value={userData.firstName}
          placeholder='Ime'
          onChange={handleInputChange}
          error={errors[1]?.firstName}
        />
        <Input
          name={UserDataFields.LastName}
          value={userData.lastName}
          placeholder='Prezime'
          onChange={handleInputChange}
          error={errors[1]?.lastName}
        />
        <Input
          name={UserDataFields.Email}
          value={userData.email}
          placeholder='Email'
          onChange={handleInputChange}
          error={errors[1]?.email}
        />
        <Input
          name={UserDataFields.Password}
          value={userData.password}
          placeholder='Lozinka'
          onChange={handleInputChange}
          error={errors[1]?.password}
          type='password'
        />
        <Input
          name={UserDataFields.RepeatedPassword}
          value={userData.repeatedPassword}
          placeholder='Potvrdite lozinku'
          onChange={handleInputChange}
          error={errors[1]?.repeatedPassword}
          type='password'
        />
      </div>

      <CheckboxFieldsWrapper
        userData={userData}
        updateUserData={updateUserData}
        errorMessage={errors[1]?.termsAndConditionsEnabled}
      />
    </>
  );
};
