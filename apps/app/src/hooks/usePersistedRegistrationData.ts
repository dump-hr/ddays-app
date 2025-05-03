import { RegistrationDto } from '@/types/user/user';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'registration_data';

const defaultRegistrationData: RegistrationDto = {
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
};

export const usePersistedRegistrationData = () => {
  const [userData, setUserData] = useState<RegistrationDto>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultRegistrationData;
  });

  const updateUserData = (newData: Partial<RegistrationDto>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const clearUserData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUserData(defaultRegistrationData);
  };

  return { userData, updateUserData, clearUserData };
};
