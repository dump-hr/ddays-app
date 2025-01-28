import { ChangeEvent } from 'react';
import { Input } from '../../Input';
import c from './FirstStepRegistrationForm.module.scss';
import { Checkbox } from '../../Checkbox';

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
};

export const FirstStepRegistrationForm = ({
  userData,
  updateUserData,
}: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserData({ [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateUserData({ [name]: checked });
  };

  return (
    <>
      <div className={c.inputFieldsWrapper}>
        <Input
          name='firstName'
          value={userData.firstName}
          placeholder='Ime'
          onChange={handleInputChange}
        />
        <Input
          name='lastName'
          value={userData.lastName}
          placeholder='Prezime'
          onChange={handleInputChange}
        />
        <Input
          name='email'
          value={userData.email}
          placeholder='Email'
          onChange={handleInputChange}
        />
        <Input
          name='password'
          value={userData.password}
          placeholder='Lozinka'
          onChange={handleInputChange}
          type='password'
        />
        <Input
          name='repeatedPassword'
          value={userData.repeatedPassword}
          placeholder='Potvrdite lozinku'
          onChange={handleInputChange}
          type='password'
        />
      </div>

      <div className={c.checkboxFieldsWrapper}>
        <Checkbox
          label='Želim primati novosti o DUMP Days konferenciji.'
          checked={userData.newsletterEnabled}
          name='newsletterEnabled'
          onChange={handleCheckboxChange}
          key={1}
        />
        <Checkbox
          label='Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.'
          checked={userData.companiesNewsEnabled}
          name='companiesNewsEnabled'
          onChange={handleCheckboxChange}
          key={2}
        />
        <Checkbox
          label='Slažem se s uvjetima i odredbama.'
          checked={userData.termsAndConditionsEnabled}
          name='termsAndConditionsEnabled'
          onChange={handleCheckboxChange}
          key={3}
        />
      </div>
    </>
  );
};
