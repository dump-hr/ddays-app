type InputType = 'text' | 'email' | 'password';

type Input = {
  placeholder: string;
  type: InputType | undefined;
};

export const textInputs: Input[] = [
  {
    placeholder: 'Ime',
    type: 'text',
  },
  {
    placeholder: 'Prezime',
    type: 'text',
  },
  {
    placeholder: 'Email',
    type: 'email',
  },
  {
    placeholder: 'Broj mobitela',
    type: 'text',
  },
  {
    placeholder: 'Godina rođenja',
    type: 'text',
  },
];

export const dropdownInputs = ['Godina rođenja', 'Trenutna okupacija'];
