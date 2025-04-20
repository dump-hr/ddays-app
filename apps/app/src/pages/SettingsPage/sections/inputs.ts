import { ChangePasswordFields, UserProfileFields } from '@/types/enums';
import { PasswordInputs, ProfileSettingsDto } from '@/types/user/user';

type InputType = 'text' | 'email' | 'password';

type Input<T> = {
  name: T;
  placeholder: string;
  type: InputType | undefined;
};

export const textInputs: Input<UserProfileFields>[] = [
  {
    name: UserProfileFields.FirstName,
    placeholder: 'Ime',
    type: 'text',
  },
  {
    name: UserProfileFields.LastName,
    placeholder: 'Prezime',
    type: 'text',
  },
  {
    name: UserProfileFields.Email,
    placeholder: 'Email',
    type: 'email',
  },
  {
    name: UserProfileFields.PhoneNumber,
    placeholder: 'Broj mobitela',
    type: 'text',
  },
  {
    name: UserProfileFields.BirthYear,
    placeholder: 'Godina rođenja',
    type: 'text',
  },
];

export const passwordInputs: Input<ChangePasswordFields>[] = [
  {
    name: ChangePasswordFields.Password,
    placeholder: 'Trenutna lozinka',
    type: 'password',
  },
  {
    name: ChangePasswordFields.NewPassword,
    placeholder: 'Nova lozinka',
    type: 'password',
  },
  {
    name: ChangePasswordFields.RepeatedPassword,
    placeholder: 'Potvrdi novu lozinku',
    type: 'password',
  },
];

export const checkboxInputs = [
  {
    name: UserProfileFields.NewsletterEnabled,
    label: 'Želim primati novosti o DUMP Days konferenciji.',
  },
  {
    name: UserProfileFields.CompaniesNewsEnabled,
    label: 'Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.',
  },
];

export const editProfileFields: (keyof ProfileSettingsDto)[] = [
  UserProfileFields.FirstName,
  UserProfileFields.LastName,
  UserProfileFields.Email,
  UserProfileFields.PhoneNumber,
  UserProfileFields.BirthYear,
  UserProfileFields.EducationDegree,
  UserProfileFields.Occupation,
];

export const changePasswordFields: (keyof PasswordInputs)[] = [
  ChangePasswordFields.Password,
  ChangePasswordFields.RepeatedPassword,
  ChangePasswordFields.NewPassword,
];
