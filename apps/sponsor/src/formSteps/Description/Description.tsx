import { useState } from 'react';

import { useGetSponsorDescription } from '../../api/useGetSponsorDescription';
import { useUpdateSponsorDescription } from '../../api/useUpdateSponsorDescription';
import TextArea from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Description.module.scss';

const Description: FormComponent = ({ close }) => {
  const [description, setDescription] = useState<string>();

  const { data, error, isLoading } = useGetSponsorDescription();
  const updateSponsorDescription = useUpdateSponsorDescription();

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    await updateSponsorDescription.mutateAsync({
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
          value={description ?? data.description ?? ''}
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

export default Description;
