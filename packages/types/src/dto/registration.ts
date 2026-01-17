import { InterestDto } from './interest';

export type RegistrationDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  newPassword?: string;
  repeatedPassword?: string;
  profilePhotoUrl: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled?: boolean;
  interests: InterestDto[];
  isFromGoogleAuth?: boolean;
  inviteCode?: string;
  isInvited?: boolean;
};
