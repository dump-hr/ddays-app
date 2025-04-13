import { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { RegistrationDto } from '@/types/user/user';
import { validations } from '@/helpers/validateInput';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

interface UserContextType {
  userData: RegistrationDto;
  updateUserData: (data: Partial<RegistrationDto>) => void;
  userSettingsData: RegistrationDto;
  updateUserSettingsData: (data: Partial<RegistrationDto>) => void;
}

const defaultUserData: RegistrationDto = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatedPassword: '',
  newPassword: '',
  phoneNumber: validations.formatPhoneNumber('0912345678'),
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
    const parsedUserData = JSON.parse(userData);
    parsedUserData.phoneNumber = validations.formatPhoneNumber(
      parsedUserData.phoneNumber,
    );
    return parsedUserData;
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
  const { data: loggedInUser, isLoading } = useLoggedInUser();

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

  useEffect(() => {
    if (loggedInUser && !isLoading) {
      updateUserData(loggedInUser);
    }
  }, [loggedInUser, isLoading]);

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
