import { CompanyCategory } from '@ddays-app/types';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useCompanyUpdateDescription } from '../../api/company/useCompanyUpdateDescription';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Description.module.scss';

export const Description: FormComponent = ({ close }) => {
  const [description, setDescription] = useState<string>();
  const [websiteUrl, setWebsiteUrl] = useState<string>();
  const [instagramUrl, setInstagramUrl] = useState<string>();
  const [linkedinUrl, setLinkedinUrl] = useState<string>();
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

  function countWords(text: string): number {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  const handleSubmit = async () => {
    const descriptionString = description ?? company.description ?? '';
    const wordCount = countWords(descriptionString);

    if (wordCount < 65 || wordCount >= 75) {
      toast.error('Duljina teksta opisa ne odgovara uvjetima.');
      return;
    }

    const fullUrlRegex =
      /^https:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^?#\s]*)?(?:\?[^#\s]*)?(?:#[^\s]*)?$/;

    const websiteUrlString = websiteUrl ?? company.websiteUrl ?? '';
    const instagramUrlString = instagramUrl ?? company.instagramUrl ?? '';
    const linkedinUrlString = linkedinUrl ?? company.linkedinUrl ?? '';

    if (websiteUrlString && !fullUrlRegex.test(websiteUrlString)) {
      toast.error('Link na web stranicu nije ispravan');
      return;
    }

    if (instagramUrlString && !fullUrlRegex.test(instagramUrlString)) {
      toast.error('Link na Instagram profil nije ispravan');
      return;
    }

    if (linkedinUrlString && !fullUrlRegex.test(linkedinUrlString)) {
      toast.error('Link na LinkedIn profil nije ispravan');
      return;
    }

    await updateDescription.mutateAsync({
      description: descriptionString,
      websiteUrl: websiteUrlString,
      instagramUrl: instagramUrlString,
      linkedinUrl: linkedinUrlString,
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
      {company.category === CompanyCategory.GOLD && (
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
          value={websiteUrl ?? company.websiteUrl ?? ''}
          label='Link na web stranicu'
          onChange={(e) => setWebsiteUrl(e)}
        />
      </div>
      <div className={c.inputContainer}>
        <Input
          value={instagramUrl ?? company.instagramUrl ?? ''}
          label='Link na Instagram profil'
          onChange={(e) => setInstagramUrl(e)}
        />
      </div>
      <div className={c.inputContainer}>
        <Input
          value={linkedinUrl ?? company.linkedinUrl ?? ''}
          label='Link na LinkedIn profil'
          onChange={(e) => setLinkedinUrl(e)}
        />
      </div>
      <button onClick={handleSubmit} className={c.button}>
        Spremi
      </button>
    </div>
  );
};
