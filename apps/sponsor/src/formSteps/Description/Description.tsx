import { useState } from 'react';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateDescription } from '../../api/company/useCompanyUpdateDescription';
import { TextArea } from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Description.module.scss';

export const Description: FormComponent = ({ close }) => {
  const [description, setDescription] = useState('');

  const { data, error, isLoading } = useCompanyGetCurrentPublic();
  const updateDescription = useCompanyUpdateDescription();

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    await updateDescription.mutateAsync({
      description: description ?? data.description,
    });
    close();
  };

  return (
    <div className={c.container}>
      <h1 className={c.title}>O tvrtki</h1>
      <p className={c.description}>
        Ispunite detalje o svojoj tvrtki. Pružite kratak pregled vaših
        projekata, rješenja ili usluga koje nudite. Opišite prilike koje nudite
        studentima, uključujući ljetne prakse i otvorene junior pozicije.
      </p>
      <div className={c.inputContainer}>
        <TextArea
          value={description ?? data.description}
          onChange={(value) => setDescription(value)}
          limit={70}
          deviation={5}
          label='Opis tvrtke'
          rows={16}
        />
      </div>
      <button onClick={handleSubmit} className={c.button}>
        Spremi
      </button>
    </div>
  );
};
