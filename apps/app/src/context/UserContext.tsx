import { UserDto } from '@ddays-app/types/src/dto/user';
import { createContext, useState, useContext, ReactNode } from 'react';

// Define the extended user data type with repeatedPassword
export type ExtendedUserDto = UserDto & { repeatedPassword: string };

interface UserContextType {
  userData: ExtendedUserDto;
  setUserData: (data: Partial<ExtendedUserDto>) => void;
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

const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  setUserData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<ExtendedUserDto>(defaultUserData);

  const updateUserData = (newData: Partial<ExtendedUserDto>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData: updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default UserContext;