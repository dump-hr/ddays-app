import { CompanyCategory } from '@ddays-app/types';
import { useState } from 'react';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateDescription } from '../../api/company/useCompanyUpdateDescription';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Description.module.scss';

export const Description: FormComponent = ({ close }) => {
  const [description, setDescription] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [instagram, setInstagram] = useState<string>();
  const [linkedin, setLinkedin] = useState<string>();
  const [opportunitiesDescription, setOpportunitiesDescription] =
    useState<string>();

  const { data: company, error, isLoading } = useCompanyGetCurrentPublic();
  const updateDescription = useCompanyUpdateDescription();

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (isLoading || !company) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    await updateDescription.mutateAsync({
      description: description ?? company.description ?? '',
      website: website ?? company.website ?? '',
      instagram: instagram ?? company.instagram ?? '',
      linkedin: linkedin ?? company.linkedin ?? '',
      opportunitiesDescription:
        opportunitiesDescription ?? company.opportunitiesDescription ?? '',
    });
    close();
  };

  return (
    <div className={c.container}>
      <h1 className={c.title}>O tvrtki</h1>
      <p className={c.description}>
        Ispunite detalje o svojoj tvrtki. Pružite kratak pregled vaših
        projekata, rješenja ili usluga koje nudite. Opišite prilike koje nudite
        studentima, uključujući ljetne prakse.
      </p>
      <div className={c.inputContainer}>
        <TextArea
          value={description ?? company.description ?? ''}
          onChange={(value) => setDescription(value)}
          limit={70}
          deviation={5}
          label='Opis tvrtke'
          rows={8}
        />
      </div>
      {company.category === CompanyCategory.Gold && (
        <div className={c.inputContainer}>
          <TextArea
            value={
              opportunitiesDescription ?? company.opportunitiesDescription ?? ''
            }
            onChange={(value) => setOpportunitiesDescription(value)}
            limit={70}
            deviation={5}
            label='Poslovne prilike, o poslovima i projektima'
            rows={8}
          />
        </div>
      )}
      <div className={c.inputContainer}>
        <Input
          value={website ?? company.website ?? ''}
          label='Link na web stranicu'
          onChange={(e) => setWebsite(e)}
        />
      </div>
      <div className={c.inputContainer}>
        <Input
          value={instagram ?? company.instagram ?? ''}
          label='Link na Instagram profil'
          onChange={(e) => setInstagram(e)}
        />
      </div>
      <div className={c.inputContainer}>
        <Input
          value={linkedin ?? company.linkedin ?? ''}
          label='Link na LinkedIn profil'
          onChange={(e) => setLinkedin(e)}
        />
      </div>
      <button onClick={handleSubmit} className={c.button}>
        Spremi
      </button>
    </div>
  );
};
