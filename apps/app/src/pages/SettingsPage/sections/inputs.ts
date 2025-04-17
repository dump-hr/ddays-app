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

export const dropdownInputs = [
  {
    name: UserProfileFields.EducationDegree,
    placeholder: 'Stupanj obrazovanja',
    options: [
      { value: 'Osnovno obrazovanje', label: 'Osnovno obrazovanje' },
      {
        value: 'Srednjoškolsko obrazovanje',
        label: 'Srednjoškolsko obrazovanje',
      },
      { value: 'Stručni studiji', label: 'Stručni studiji' },
      {
        value: 'Sveučilišni preddiplomski studiji',
        label: 'Sveučilišni preddiplomski studiji',
      },
      {
        value: 'Sveučilišni diplomski studiji',
        label: 'Sveučilišni diplomski studiji',
      },
      {
        value: 'Specijalistički diplomski studij',
        label: 'Specijalistički diplomski studij',
      },
      {
        value: 'Poslijediplomski specijalistički studij',
        label: 'Poslijediplomski specijalistički studij',
      },
      { value: 'Doktorski studij', label: 'Doktorski studij' },
    ],
  },
  {
    name: UserProfileFields.Occupation,
    placeholder: 'Trenutna okupacija',
    options: [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
    ],
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
