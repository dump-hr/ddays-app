import { FormComponent } from '../../types/form';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { Button } from '../../components/Button';

export const Accreditation: FormComponent = () => {
  const [personName, setPersonName] = useState<string>('');
  const [people, setPeople] = useState<string[]>([]);

  const handleAddPerson = () => {
    if (!personName.trim()) return;
    setPeople([...people, personName.trim()]);
    setPersonName('');
  };

  const handleRemovePerson = (name: string) => {
    setPeople(people.filter((p) => p != name));
  };

  return (
    <section>
      <h1>Akreditacije</h1>
      <p>Dodajte osobe koje će prisustvovati na DUMP DAYS</p>

      <div>
        <Input
          value={personName}
          label='Ime i prezime'
          onChange={(value) => setPersonName(value)}
        />
        <Button onClick={handleAddPerson}>Dodaj osobu</Button>
      </div>

      <ul>
        {people.map((person) => (
          <li key={person}>
            <span>{person}</span>
            <Button
              variant='secondary'
              onClick={() => handleRemovePerson(person)}>
              Ukloni
            </Button>
          </li>
        ))}
      </ul>

      <Button>Spremi</Button>
    </section>
  );
};
