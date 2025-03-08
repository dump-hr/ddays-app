import { UserDataFields } from '../../types/enums';
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
    label: 'Pretplati se na newsletter',
  },
  {
    name: UserDataFields.TermsAndConditionsEnabled,
    label: 'Prihvaćam uvjete korištenja',
  },
];