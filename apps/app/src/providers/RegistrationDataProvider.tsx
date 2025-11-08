import { RegistrationDto } from '@/types/user/user';
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  interests: [],
  inviteCode: '',
};

type RegistrationDataContextType = {
  userData: RegistrationDto;
  updateUserData: (newData: Partial<RegistrationDto>) => void;
  clearUserData: () => void;
};

const RegistrationDataContext = createContext<
  RegistrationDataContextType | undefined
>(undefined);

export const RegistrationDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<RegistrationDto>(
    defaultRegistrationData,
  );

  const updateUserData = (newData: Partial<RegistrationDto>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const clearUserData = () => {
    setUserData(defaultRegistrationData);
  };

  return (
    <RegistrationDataContext.Provider
      value={{ userData, updateUserData, clearUserData }}>
      {children}
    </RegistrationDataContext.Provider>
  );
};

export const useRegistrationData = () => {
  const context = useContext(RegistrationDataContext);
  if (context === undefined) {
    throw new Error(
      'useRegistrationData must be used within a RegistrationDataProvider',
    );
  }
  return context;
};
