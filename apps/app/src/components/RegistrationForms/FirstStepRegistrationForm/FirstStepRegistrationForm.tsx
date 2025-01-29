import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../../Input';
import c from './FirstStepRegistrationForm.module.scss';
import { Checkbox } from '../../Checkbox';
import { RegistrationFormErrors } from '../../../types/errors/errors.dto';
import { validateField } from '../../../helpers/validateInput';
import { UserDataFields } from '../../../types/user/user.dto';

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
  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateUserData({ [name]: checked });
  };

  useEffect(() => {
    if (isSubmitted) {
      const newErrors: RegistrationFormErrors = {};

      Object.keys(userData).forEach((key) => {
        const error = validateField(
          key as keyof UserData,
          userData[key as keyof UserData],
          userData,
        );

        if (error) {
          newErrors[key as keyof RegistrationFormErrors] = error;
        }
      });

      setErrors(newErrors);
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
          error={errors.firstName}
        />
        <Input
          name={UserDataFields.LastName}
          value={userData.lastName}
          placeholder='Prezime'
          onChange={handleInputChange}
          error={errors.lastName}
        />
        <Input
          name={UserDataFields.Email}
          value={userData.email}
          placeholder='Email'
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          name={UserDataFields.Password}
          value={userData.password}
          placeholder='Lozinka'
          onChange={handleInputChange}
          error={errors.password}
          type='password'
        />
        <Input
          name={UserDataFields.RepeatedPassword}
          value={userData.repeatedPassword}
          placeholder='Potvrdite lozinku'
          onChange={handleInputChange}
          error={errors.repeatedPassword}
          type='password'
        />
      </div>

      <div className={c.checkboxFieldsWrapper}>
        <Checkbox
          label='Želim primati novosti o DUMP Days konferenciji.'
          checked={userData.newsletterEnabled}
          name={UserDataFields.NewsletterEnabled}
          onChange={handleCheckboxChange}
          error={errors.termsAndConditionsEnabled}
          key={1}
        />
        <Checkbox
          label='Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.'
          checked={userData.companiesNewsEnabled}
          name={UserDataFields.CompaniesNewsEnabled}
          onChange={handleCheckboxChange}
          error={errors.termsAndConditionsEnabled}
          key={2}
        />
        <Checkbox
          label='Slažem se s uvjetima i odredbama.'
          checked={userData.termsAndConditionsEnabled}
          name={UserDataFields.TermsAndConditionsEnabled}
          onChange={handleCheckboxChange}
          error={errors.termsAndConditionsEnabled}
          key={3}
        />
      </div>
    </>
  );
};
