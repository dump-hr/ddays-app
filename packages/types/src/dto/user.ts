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
  termsAndConditionsEnabled?: boolean;
};

export type UserModifyDto = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled?: boolean;
  companiesNewsEnabled?: boolean;
  isConfirmed?: boolean;
  isDeleted?: boolean;
};

export type UserPublicDto = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  isConfirmed: boolean;
  isDeleted: boolean;
  points: number;
};

export type ChangeUserPasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export type UserToEventDto = {
  userId: number;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioProfile?: string;
  cv?: string;
  description?: string;
};
