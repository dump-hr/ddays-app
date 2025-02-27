import { ChangeEvent, useEffect } from 'react';
import { Input } from '../../Input';
import c from './FirstStepRegistrationForm.module.scss';
import { RegistrationFormErrors } from '../../../types/errors/errors.dto';
import { validateField } from '../../../helpers/validateInput';
import { UserDataFields } from '../../../types/user/user.dto';
import { useRegistration } from '../../../providers/RegistrationContext';
import { CheckboxFieldsWrapper } from '../CheckboxFieldsWrapper';
import { RegistrationStep } from '../../../types/registration/registration.dto';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
};

type Props = {
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
  isSubmitted: boolean;
};

export const FirstStepRegistrationForm = ({
  userData,
  updateUserData,
  isSubmitted,
}: Props) => {
  const { errors, clearStepErrors, setStepErrors } = useRegistration();

  const firstStepFields: (keyof UserData)[] = [
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
      const error = validateField(key, userData[key], userData);
      newErrors[key] = error || '';
    });

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(RegistrationStep.ONE, newErrors);
    } else {
      clearStepErrors(RegistrationStep.ONE);
    }
  };

  const allFieldsAreFilled = () => {
    return (
      userData.firstName != '' &&
      userData.lastName !== '' &&
      userData.email !== '' &&
      userData.password !== '' &&
      userData.repeatedPassword !== ''
    );
  };

  useEffect(() => {
    if (isSubmitted || allFieldsAreFilled()) {
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
