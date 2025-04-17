import { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { ProfileSettingsDto } from '@/types/user/user';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

interface UserContextType {
  userSettingsData: ProfileSettingsDto;
  updateUserSettingsData: (data: Partial<ProfileSettingsDto>) => void;
}

const defaultUserData: ProfileSettingsDto = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newPassword: '',
  repeatedPassword: '',
  phoneNumber: '',
  birthYear: null,
  educationDegree: '',
  occupation: '',
  newsletterEnabled: false,
  companiesNewsEnabled: false,
};

const UserContext = createContext<UserContextType>({
  userSettingsData: defaultUserData,
  updateUserSettingsData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: loggedInUser, isLoading } = useLoggedInUser();

  const [userSettingsData, setUserSettingsData] =
    useState<ProfileSettingsDto>(defaultUserData);

  const updateUserSettingsData = (newData: Partial<ProfileSettingsDto>) => {
    setUserSettingsData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    if (loggedInUser && !isLoading) {
      updateUserSettingsData(loggedInUser);
    }
  }, [loggedInUser, isLoading]);

  return (
    <UserContext.Provider
      value={{
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
