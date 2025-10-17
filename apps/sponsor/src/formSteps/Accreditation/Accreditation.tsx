import { useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateAccreditation } from '../../api/company/useCompanyUpdateAccreditation';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { FormComponent } from '../../types/form';
import c from './Accreditation.module.scss';
import clsx from 'clsx';

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
  const [people, setPeople] = useState<string[]>(
    useCompanyGetCurrentPublic().data?.peopleForAccreditation ?? [],
  );

  const { mutateAsync: updateAccreditation } = useCompanyUpdateAccreditation();

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

  return (
    <section className={c.accreditationSection}>
      <h1>Akreditacije</h1>
      <p className={c.yMargin}>
        Dodajte osobe koje će prisustvovati na DUMP DAYS
      </p>

      <div>
        <Input
          value={personName}
          label='Ime i prezime'
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
        onClick={() => updateAccreditation(people)}
        className={clsx(c.button, c.primary, c.saveButton)}>
        Spremi
      </button>
    </section>
  );
};
