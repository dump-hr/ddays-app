import { useEffect, useState } from 'react';

import { useGetSponsorDescription } from '../../api/useGetSponsorDescription';
import { useUpdateSponsorDescription } from '../../api/useUpdateSponsorDescription';
import TextArea from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Description.module.scss';

const Description: FormComponent = ({ close }) => {
  const [companyDescriptionText, setCompanyDescriptionText] = useState('');

  const { data, error, isLoading } = useGetSponsorDescription();

  const updateSponsorDescription = useUpdateSponsorDescription();

  const handleSubmit = async () => {
    await updateSponsorDescription.mutateAsync({
      description: companyDescriptionText,
    });
    close();
  };

  useEffect(() => {
    if (!data) return;
    setCompanyDescriptionText(data.description);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

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
          value={companyDescriptionText}
          onChange={(value) => setCompanyDescriptionText(value)}
          limit={70}
          deviation={5}
          label='Opis tvrtke'
        />
      </div>
      <button onClick={handleSubmit} className={c.button}>
        Nastavi
      </button>
    </div>
  );
};

export default Description;
