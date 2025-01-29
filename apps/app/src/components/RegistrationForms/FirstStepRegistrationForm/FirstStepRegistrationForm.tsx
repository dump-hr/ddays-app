import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../../Input';
import c from './FirstStepRegistrationForm.module.scss';
import { Checkbox } from '../../Checkbox';
import { RegistrationFormErrors } from '../../../types/errors/errors.dto';
import { validateField } from '../../../helpers/validateInput';

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
          name='firstName'
          value={userData.firstName}
          placeholder='Ime'
          onChange={handleInputChange}
          error={errors.firstName}
        />
        <Input
          name='lastName'
          value={userData.lastName}
          placeholder='Prezime'
          onChange={handleInputChange}
          error={errors.lastName}
        />
        <Input
          name='email'
          value={userData.email}
          placeholder='Email'
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          name='password'
          value={userData.password}
          placeholder='Lozinka'
          onChange={handleInputChange}
          error={errors.password}
          type='password'
        />
        <Input
          name='repeatedPassword'
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
          name='newsletterEnabled'
          onChange={handleCheckboxChange}
          error={errors.termsAndConditionsEnabled}
          key={1}
        />
        <Checkbox
          label='Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.'
          checked={userData.companiesNewsEnabled}
          name='companiesNewsEnabled'
          onChange={handleCheckboxChange}
          error={errors.termsAndConditionsEnabled}
          key={2}
        />
        <Checkbox
          label='Slažem se s uvjetima i odredbama.'
          checked={userData.termsAndConditionsEnabled}
          name='termsAndConditionsEnabled'
          onChange={handleCheckboxChange}
          error={errors.termsAndConditionsEnabled}
          key={3}
        />
      </div>
    </>
  );
};
