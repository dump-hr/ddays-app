import { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { PasswordInputs, ProfileSettingsDto } from '@/types/user/user';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

interface UserContextType {
  userSettingsData: ProfileSettingsDto;
  passwordInputsData: PasswordInputs;
  updateUserSettingsData: (data: Partial<ProfileSettingsDto>) => void;
  updatePasswordInputsData: (data: Partial<PasswordInputs>) => void;
}

const defaultUserData: ProfileSettingsDto = {
  firstName: '',
  lastName: '',
  email: '',
  /*   password: '',
  newPassword: '',
  repeatedPassword: '', */
  phoneNumber: '',
  birthYear: null,
  educationDegree: '',
  occupation: '',
  newsletterEnabled: false,
  companiesNewsEnabled: false,
};

const defaultPasswordInputsData = {
  password: '',
  newPassword: '',
  repeatedPassword: '',
};

const UserContext = createContext<UserContextType>({
  userSettingsData: defaultUserData,
  passwordInputsData: defaultPasswordInputsData,
  updateUserSettingsData: () => {},
  updatePasswordInputsData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: loggedInUser, isLoading } = useLoggedInUser();
  const [passwordInputsData, setPasswordInputsData] = useState<PasswordInputs>(
    defaultPasswordInputsData,
  );

  const [userSettingsData, setUserSettingsData] =
    useState<ProfileSettingsDto>(defaultUserData);

  const updateUserSettingsData = (newData: Partial<ProfileSettingsDto>) => {
    setUserSettingsData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updatePasswordInputsData = (newData: Partial<PasswordInputs>) => {
    setPasswordInputsData((prevData) => ({
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
        passwordInputsData,
        updatePasswordInputsData,
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
