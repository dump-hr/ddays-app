import { ChangeEvent, useState } from 'react';
import { Input } from '../../Input';
import c from './FirstStepRegistrationForm.module.scss';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
};

export const FirstStepRegistrationForm = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
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
  );
};
