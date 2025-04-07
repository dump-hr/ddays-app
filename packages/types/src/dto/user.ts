export type UserDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
};

export interface UserModifyDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthYear: number;
  educationDegree?: string;
  occupation?: string;
  newsletterEnabled?: boolean;
  companiesNewsEnabled?: boolean;
  isConfirmed?: boolean;
}
