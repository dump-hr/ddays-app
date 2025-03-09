import { UserDto } from '@ddays-app/types/src/dto/user';
import { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';

export type ExtendedUserDto = UserDto & { repeatedPassword: string };

interface UserContextType {
  userData: ExtendedUserDto;
  updateUserData: (data: Partial<ExtendedUserDto>) => void;
  userSettingsData: ExtendedUserDto;
  updateUserSettingsData: (data: Partial<ExtendedUserDto>) => void;
}

const defaultUserData: ExtendedUserDto = {
  firstName: 'Toni',
  lastName: 'Grbić',
  email: 'tonigrbic.example.com',
  password: 'pass1234',
  repeatedPassword: 'pass1234',
  phoneNumber: '0912345678',
  birthYear: 2001,
  educationDegree: null,
  occupation: null,
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
    useState<ExtendedUserDto>(setInitialUserData());
  const [userSettingsData, setUserSettingsData] =
    useState<ExtendedUserDto>(setInitialUserData());

  const updateUserData = (newData: Partial<ExtendedUserDto>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateUserSettingsData = (newData: Partial<ExtendedUserDto>) => {
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
