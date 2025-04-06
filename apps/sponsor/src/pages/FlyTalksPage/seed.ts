import { UserDto } from '@ddays-app/types/src/dto/user';

export const applicants: UserDto[] = [
  {
    email: 'email@email.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    phoneNumber: '123456789',
    birthYear: 2000,
    educationDegree: 'Bachelor',
    occupation: 'Student',
    newsletterEnabled: true,
    companiesNewsEnabled: true,
    termsAndConditionsEnabled: true,
  },
  {
    email: 'ivanhorvat@gmail.com',
    firstName: 'Ivan',
    lastName: 'Horvat',
    password: 'password',
    phoneNumber: '123456789',
    birthYear: 2000,
    educationDegree: 'Bachelor',
    occupation: 'Student',
    newsletterEnabled: true,
    companiesNewsEnabled: true,
    termsAndConditionsEnabled: true,
  },
];
