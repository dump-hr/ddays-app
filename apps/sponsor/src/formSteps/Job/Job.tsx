import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAddSponsorJob } from '../../api/useAddSponsorJob';
import { useDeleteSponsorJob } from '../../api/useDeleteSponsorJob';
import { useGetLoggedCompany } from '../../api/useGetLoggedCompany';
import { useGetSponsorJobs } from '../../api/useGetSponsorJobs';
import TextArea from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Job.module.scss';

export const Job: FormComponent = () => {
  const [position, setPosition] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const { data: companyData } = useGetLoggedCompany();
  const sponsorId = companyData?.id;

  const addSponsorJob = useAddSponsorJob(sponsorId);
  const deleteSponsorJob = useDeleteSponsorJob();
  const { data: jobs, error, isLoading } = useGetSponsorJobs(sponsorId);

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (isLoading || !jobs) {
    return <div>Loading...</div>;
  }

  const handleAdd = async () => {
    if (!sponsorId) {
      toast.error('Niste prijavljeni');
      return;
    }

    await addSponsorJob.mutateAsync({
      companyId: sponsorId,
      position,
      location,
      details,
    });

    setPosition('');
    setLocation('');
    setDetails('');
  };

  const handleRemove = async (id: number) => {
    await deleteSponsorJob.mutateAsync(id);
  };

  return (
    <div className={c.container}>
      <h1 className={c.title}>Oglasi za posao</h1>
      <p className={c.description}>
        Opišite otvorene pozicije unutar vaše tvrtke. Navedite naziv pozicije,
        ključne odgovornosti i kvalifikacije koje kandidati trebaju imati.
      </p>

      <div>
        {jobs &&
          jobs.map(({ id, details, location, position }, index) => (
            <div key={id} className={c.inputContainer}>
              <div className={c.subtitleContainer}>
                <h2 className={c.subtitle}>#{index + 1} Oglas</h2>
                <span onClick={() => handleRemove(id)} className={c.label}>
                  Ukloni
                </span>
              </div>
              <TextArea
                value={position}
                limit={20}
                deviation={5}
                label='Pozicija'
                disabled
              />
              <TextArea
                value={location}
                limit={20}
                deviation={5}
                label='Lokacija'
                disabled
              />
              <TextArea
                value={details}
                limit={200}
                deviation={5}
                label='Detalji o oglasu'
                disabled
              />
            </div>
          ))}
      </div>

      <div className={c.inputContainer}>
        <h2 className={c.subtitle}>#0 Oglas</h2>
        <TextArea
          value={position}
          onChange={(value) => setPosition(value)}
          limit={20}
          deviation={5}
          label='Pozicija'
        />
        <TextArea
          value={location}
          onChange={(value) => setLocation(value)}
          limit={20}
          deviation={5}
          label='Lokacija'
        />
        <TextArea
          value={details}
          onChange={(value) => setDetails(value)}
          limit={200}
          deviation={5}
          label='Detalji o oglasu'
        />
      </div>

      <div className={c.inputContainer}>
        <button onClick={handleAdd} className={c.secondaryButton}>
          + Dodaj oglas
        </button>
      </div>

      <div className={c.inputContainer}>
        <button onClick={close} className={c.primaryButton}>
          Spremi
        </button>
      </div>
    </div>
  );
};
