import { JobModifyForCompanyDto } from '@ddays-app/types';
import { useEffect, useState } from 'react';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';
import { useJobUpdateForCompany } from '../../api/job/useJobUpdateForCompany';
import { TextArea } from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Job.module.scss';

export const Job: FormComponent = () => {
  const [jobs, setJobs] = useState<JobModifyForCompanyDto[]>([]);

  const { data: company } = useCompanyGetCurrentPublic();
  const { data: companyJobs } = useJobGetForCompany(company?.id);

  const { mutate: updateSponsorJobs } = useJobUpdateForCompany();

  useEffect(() => {
    setJobs(companyJobs ?? []);
  }, [companyJobs]);

  const handleAdd = () => {
    setJobs((prev) => [
      ...prev,
      {
        id: undefined,
        location: '',
        position: '',
        details: '',
      },
    ]);
  };

  const handleRemove = (idToRemove?: number) => {
    if (!idToRemove) return;

    setJobs((prev) => {
      return prev
        .filter(({ id }) => id !== idToRemove)
        .map((job) => ({ ...job }));
    });
  };

  const handleSave = () => {
    const jobsToSave = jobs.filter(isValid);
    updateSponsorJobs(jobsToSave);
  };

  const isValid = (job: JobModifyForCompanyDto) => {
    return job.position.length > 0 && job.details.length > 0;
  };

  return (
    <div className={c.container}>
      <div className={c.infoContainer}>
        <h1 className={c.title}>Oglasi za posao</h1>
        <p className={c.description}>
          Opišite otvorene pozicije unutar vaše tvrtke. Navedite naziv pozicije,
          ključne odgovornosti i kvalifikacije koje kandidati trebaju imati.
        </p>
      </div>

      <div className={c.jobsContainer}>
        {jobs.map(({ id, details, location, position }, index) => (
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
              label='Pozicija'
              onChange={(value) => {
                setJobs((prev) => {
                  const newJobs = [...prev];
                  newJobs[index].position = value;
                  return newJobs;
                });
              }}
              //  disabled
            />
            <TextArea
              value={location ?? ''}
              limit={20}
              label='Lokacija'
              onChange={(value) => {
                setJobs((prev) => {
                  const newJobs = [...prev];
                  newJobs[index].location = value;
                  return newJobs;
                });
              }}
              // disabled
            />
            <TextArea
              value={details}
              onChange={(value) => {
                setJobs((prev) => {
                  const newJobs = [...prev];
                  newJobs[index].details = value;
                  return newJobs;
                });
              }}
              limit={200}
              deviation={5}
              label='Detalji o oglasu'
              // disabled
            />
          </div>
        ))}
      </div>

      <div className='buttonsContainer'>
        <div className={c.inputContainer}>
          <button onClick={handleAdd} className={c.secondaryButton}>
            + Dodaj oglas
          </button>
        </div>

        <div className={c.inputContainer}>
          <button onClick={handleSave} className={c.primaryButton}>
            Spremi
          </button>
        </div>
      </div>
    </div>
  );
};
