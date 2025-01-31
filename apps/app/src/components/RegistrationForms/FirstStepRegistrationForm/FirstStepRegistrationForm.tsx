import { ChangeEvent, useEffect } from 'react';
import { Input } from '../../Input';
import c from './FirstStepRegistrationForm.module.scss';
import { Checkbox } from '../../Checkbox';
import { RegistrationFormErrors } from '../../../types/errors/errors.dto';
import { validateField } from '../../../helpers/validateInput';
import { UserDataFields } from '../../../types/user/user.dto';
import { useRegistration } from '../../../providers/RegistrationContext';

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
    UserDataFields.TermsAndConditionsEnabled,
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateUserData({ [name]: checked });
  };

  const validateFirstStep = () => {
    const newErrors: Partial<RegistrationFormErrors> = {};

    firstStepFields.forEach((key) => {
      const error = validateField(key, userData[key], userData);

      if (error) {
        newErrors[key] = error;
      } else {
        newErrors[key] = '';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(1, newErrors);
    } else {
      clearStepErrors(1);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
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

      <div className={c.checkboxFieldsWrapper}>
        <Checkbox
          label='Želim primati novosti o DUMP Days konferenciji.'
          checked={userData.newsletterEnabled}
          name={UserDataFields.NewsletterEnabled}
          onChange={handleCheckboxChange}
          error={errors[1]?.termsAndConditionsEnabled}
          key={1}
        />
        <Checkbox
          label='Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.'
          checked={userData.companiesNewsEnabled}
          name={UserDataFields.CompaniesNewsEnabled}
          onChange={handleCheckboxChange}
          error={errors[1]?.termsAndConditionsEnabled}
          key={2}
        />
        <Checkbox
          label='Slažem se s uvjetima i odredbama.'
          checked={userData.termsAndConditionsEnabled}
          name={UserDataFields.TermsAndConditionsEnabled}
          onChange={handleCheckboxChange}
          error={errors[1]?.termsAndConditionsEnabled}
          key={3}
        />
      </div>
    </>
  );
};
