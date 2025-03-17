export type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
};
