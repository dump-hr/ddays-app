import { useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateAccreditation } from '../../api/company/useCompanyUpdateAccreditation';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './Accreditation.module.scss';
import clsx from 'clsx';
import { useCreateUser } from '../../api/user/useCreateUser';

const isPersonNameValid = (person: string) => {
  if (!person || person.length < 2 || person.length > 50 || /\d/.test(person)) {
    toast.error('Molimo vas unesite validno ime i prezime');
    return false;
  }

  if (person.split(/\s+/).length < 2) {
    toast.error('Molimo vas unesite ime i prezime osobe');
    return false;
  }

  return true;
};

export const Accreditation: FormComponent = () => {
  const [personName, setPersonName] = useState<string>('');

  const { data: companyData } = useCompanyGetCurrentPublic();
  const { mutateAsync: updateAccreditation } = useCompanyUpdateAccreditation();
  const { mutateAsync: createUser } = useCreateUser();

  const [people, setPeople] = useState<string[]>(
    companyData?.peopleForAccreditation ?? [],
  );

  const handleAddPerson = () => {
    if (!isPersonNameValid(personName.trim())) {
      return;
    }

    setPeople([...people, personName.trim().replace(/\s+/g, ' ')]);
    setPersonName('');
  };

  const handleRemovePerson = (name: string) => {
    setPeople(people.filter((p) => p != name));
  };

  const handleSave = async () => {
    try {
      await updateAccreditation(people);

      const existingPeople = companyData?.peopleForAccreditation ?? [];
      const newPeople = people.filter((p) => !existingPeople.includes(p));

      newPeople.map(async (fullName) => {
        const [firstName, ...lastNameParts] = fullName.split(' ');
        const lastName = lastNameParts.join(' ');

        if (!firstName || !lastName) return;

        await createUser({ firstName, lastName });
      });

      toast.success('Akreditacije su uspješno spremljene!');
    } catch (error) {
      toast.error('Došlo je do greške pri spremanju akreditacija.');
      console.error(error);
    }
  };

  return (
    <section className={c.accreditationSection}>
      <h1>Akreditacije</h1>
      <p className={c.yMargin}>
        Dodajte osobe koje će prisustvovati na DUMP DAYS
      </p>

      <div>
        <Input
          value={personName}
          label='Ime osobe'
          onChange={(value) => setPersonName(value)}
        />

        <Button onClick={handleAddPerson} className={c.yMargin}>
          Dodaj osobu
        </Button>
      </div>

      <ul className={c.personList}>
        {people.map((person) => (
          <li key={person} className={c.listItem}>
            <span className={c.yMargin}>{person}</span>
            <button
              onClick={() => handleRemovePerson(person)}
              className={clsx(c.button, c.secondary)}>
              Ukloni
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSave}
        className={clsx(c.button, c.primary, c.saveButton)}>
        Spremi
      </button>
    </section>
  );
};
