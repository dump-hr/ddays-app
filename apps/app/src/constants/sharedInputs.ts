import { UserProfileFields } from '@/types/enums';

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
      { value: 'Učenik', label: 'Učenik' },
      { value: 'Student', label: 'Student' },
      { value: 'Student, zaposlen u IT-u', label: 'Student, zaposlen u IT-u' },
      { value: 'Full time zaposlena osoba', label: 'Full time zaposlena osoba' },
    ],
  },
];