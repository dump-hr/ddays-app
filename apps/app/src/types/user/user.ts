export type RegistrationDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  newPassword?: string;
  repeatedPassword?: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled?: boolean;
};

export type ProfileSettingsDto = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
};

export type PasswordInputs = {
  password?: string;
  newPassword?: string;
  repeatedPassword?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
