import { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { RegistrationDto } from '@/types/user/user';

interface UserContextType {
  userData: RegistrationDto;
  updateUserData: (data: Partial<RegistrationDto>) => void;
  userSettingsData: RegistrationDto;
  updateUserSettingsData: (data: Partial<RegistrationDto>) => void;
}

const defaultUserData: RegistrationDto = {
  firstName: 'Toni',
  lastName: 'Grbić',
  email: 'tonigrbic@example.com',
  password: '',
  repeatedPassword: '',
  newPassword: '',
  phoneNumber: '0912345678',
  birthYear: 2001,
  educationDegree: 'Option 1',
  occupation: 'Option 2',
  newsletterEnabled: false,
  companiesNewsEnabled: false,
  termsAndConditionsEnabled: false,
};

const setInitialUserData = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  }
  return defaultUserData;
};

const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
  userSettingsData: defaultUserData,
  updateUserSettingsData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] =
    useState<RegistrationDto>(setInitialUserData());
  const [userSettingsData, setUserSettingsData] =
    useState<RegistrationDto>(setInitialUserData());

  const updateUserData = (newData: Partial<RegistrationDto>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateUserSettingsData = (newData: Partial<RegistrationDto>) => {
    setUserSettingsData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userData,
        updateUserData,
        userSettingsData,
        updateUserSettingsData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default UserContext;
