import { UserDataFields } from '@/types/enums';
import { RegistrationDto } from '@/types/user/user';

type InputType = 'text' | 'email' | 'password';

type Input = {
  name: UserDataFields;
  placeholder: string;
  type: InputType | undefined;
};

export const textInputs: Input[] = [
  {
    name: UserDataFields.FirstName,
    placeholder: 'Ime',
    type: 'text',
  },
  {
    name: UserDataFields.LastName,
    placeholder: 'Prezime',
    type: 'text',
  },
  {
    name: UserDataFields.Email,
    placeholder: 'Email',
    type: 'email',
  },
  {
    name: UserDataFields.PhoneNumber,
    placeholder: 'Broj mobitela',
    type: 'text',
  },
  {
    name: UserDataFields.BirthYear,
    placeholder: 'Godina rođenja',
    type: 'text',
  },
];

export const passwordInputs: Input[] = [
  {
    name: UserDataFields.Password,
    placeholder: 'Trenutna lozinka',
    type: 'password',
  },
  {
    name: UserDataFields.NewPassword,
    placeholder: 'Nova lozinka',
    type: 'password',
  },
  {
    name: UserDataFields.RepeatedPassword,
    placeholder: 'Potvrdi novu lozinku',
    type: 'password',
  },
];

export const dropdownInputs = [
  {
    name: UserDataFields.EducationDegree,
    placeholder: 'Stupanj obrazovanja',
    options: [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
    ],
  },
  {
    name: UserDataFields.Occupation,
    placeholder: 'Trenutna okupacija',
    options: [
      { value: 'Option 1', label: 'Option 1' },
      { value: 'Option 2', label: 'Option 2' },
    ],
  },
];

export const checkboxInputs = [
  {
    name: UserDataFields.NewsletterEnabled,
    label: 'Želim primati novosti o DUMP Days konferenciji.',
  },
  {
    name: UserDataFields.TermsAndConditionsEnabled,
    label: 'Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.',
  },
];

export const editProfileFields: (keyof RegistrationDto)[] = [
  UserDataFields.FirstName,
  UserDataFields.LastName,
  UserDataFields.Email,
  UserDataFields.PhoneNumber,
  UserDataFields.BirthYear,
  UserDataFields.EducationDegree,
  UserDataFields.Occupation,
];

export const changePasswordFields: (keyof RegistrationDto)[] = [
  UserDataFields.Password,
  UserDataFields.RepeatedPassword,
  UserDataFields.NewPassword,
];
