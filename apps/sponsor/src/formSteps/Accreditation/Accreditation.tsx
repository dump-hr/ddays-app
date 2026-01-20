import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateAccreditation } from '../../api/company/useCompanyUpdateAccreditation';
import { useCreateUser } from '../../api/user/useCreateUser';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './Accreditation.module.scss';

interface Person {
  fullName: string;
  email: string;
}

// Parse stored string format "Name | email" to Person object
const parsePersonString = (str: string): Person => {
  const parts = str.split(' | ');
  if (parts.length === 2) {
    return { fullName: parts[0], email: parts[1] };
  }
  // Fallback for old format (just name)
  return { fullName: str, email: '' };
};

// Convert Person object to stored string format
const personToString = (person: Person): string => {
  return `${person.fullName} | ${person.email}`;
};

export const Accreditation: FormComponent = ({ close }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  const { data: companyData, isLoading, error } = useCompanyGetCurrentPublic();
  const { mutateAsync: updateAccreditation } = useCompanyUpdateAccreditation();
  const { mutateAsync: createUser } = useCreateUser();

  useEffect(() => {
    if (companyData?.peopleForAccreditation) {
      setPeople(companyData.peopleForAccreditation.map(parsePersonString));
    }
  }, [companyData]);

  if (error) return <div>{error.toString()}</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleAddPerson = () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2 || trimmedName.match(/\d/)) {
      toast.error('Unesite valjano ime i prezime');
      return;
    }

    if (trimmedName.split(/\s+/).length < 2) {
      toast.error('Molimo vas unesite ime i prezime osobe');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      toast.error('Unesite valjanu email adresu');
      return;
    }

    setPeople([...people, { fullName: trimmedName, email: trimmedEmail }]);
    setFullName('');
    setEmail('');
  };

  const handleRemovePerson = (emailToRemove: string) => {
    setPeople(people.filter((p) => p.email !== emailToRemove));
  };

  const handleSave = async () => {
    try {
      const peopleStrings = people.map(personToString);
      await updateAccreditation(peopleStrings);

      const existingPeople = companyData?.peopleForAccreditation ?? [];
      const existingParsed = existingPeople.map(parsePersonString);
      const newPeople = people.filter(
        (p) => !existingParsed.some((ep) => ep.email === p.email),
      );

      for (const person of newPeople) {
        const [firstName, ...lastNameParts] = person.fullName.split(' ');
        const lastName = lastNameParts.join(' ');

        if (!firstName || !lastName) continue;

        await createUser({ firstName, lastName });
      }

      close();
    } catch (error) {
      toast.error('Došlo je do greške pri spremanju akreditacija.');
      console.error(error);
    }
  };

  return (
    <div className={c.container}>
      <div>
        <h1 className={c.title}>Akreditacije</h1>
        <p className={c.description}>
          Dodajte osobe koje će prisustvovati na DUMP DAYS
        </p>

        <div className={c.inputContainer}>
          <label>Osobe za akreditaciju</label>

          <ul className={c.personList}>
            {people.map((person) => (
              <div key={person.email} className={c.personRow}>
                <li className={c.personItem}>
                  <span>{person.fullName}</span>
                  <span style={{ opacity: 0.7, marginLeft: '8px' }}>
                    {person.email}
                  </span>
                </li>
                <button
                  type='button'
                  onClick={() => handleRemovePerson(person.email)}
                  className={c.removePersonButton}>
                  Ukloni
                </button>
              </div>
            ))}
          </ul>

          <div className={c.addPersonContainer}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <Input
                value={fullName}
                onChange={(val) => setFullName(val)}
                label='Ime i prezime'
              />
              <Input
                value={email}
                onChange={(val) => setEmail(val)}
                label='Email'
              />
            </div>
            <button
              onClick={handleAddPerson}
              className={`${c.smallButton} ${c.button}`}>
              Dodaj osobu
            </button>
          </div>
        </div>
      </div>
      <button onClick={handleSave} className={c.button}>
        Spremi
      </button>
    </div>
  );
};
