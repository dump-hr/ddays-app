import { JobModifyForCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';
import { useJobUpdateForCompany } from '../../api/job/useJobUpdateForCompany';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Job.module.scss';

export const Job: FormComponent = ({ close }) => {
  const [jobs, setJobs] = useState<JobModifyForCompanyDto[]>([]);

  const { data: company } = useCompanyGetCurrentPublic();
  const { data: companyJobs } = useJobGetForCompany(company?.id);

  const { mutate: updateSponsorJobs } = useJobUpdateForCompany();

  useEffect(() => {
    setJobs(companyJobs ?? []);
    if (!companyJobs?.length) handleAdd();
  }, [companyJobs]);

  const handleAdd = () => {
    setJobs((prev) => [
      ...prev,
      {
        location: '',
        position: '',
        details: '',
        link: '',
      },
    ]);
  };

  const handleRemove = (idToRemove?: number) => {
    setJobs((prev) => {
      return prev
        .filter(({ id }) => id !== idToRemove)
        .map((job) => ({ ...job }));
    });
  };

  const handleSave = () => {
    const jobsToSave = jobs.filter(isValid);
    updateSponsorJobs(jobsToSave);
    close();
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
        {jobs.map(({ id, details, location, position, link }, index) => (
          <div key={index} className={c.inputContainer}>
            <div className={c.subtitleContainer}>
              <h2 className={c.subtitle}>#{index + 1} Oglas</h2>
              <span onClick={() => handleRemove(id)} className={c.label}>
                Ukloni
              </span>
            </div>
            <Input
              value={position}
              label='Pozicija'
              onChange={(value) => {
                setJobs((prev) => {
                  const newJobs = [...prev];
                  newJobs[index].position = value;
                  return newJobs;
                });
              }}
            />
            <Input
              value={location ?? ''}
              label='Lokacija'
              onChange={(value) => {
                setJobs((prev) => {
                  const newJobs = [...prev];
                  newJobs[index].location = value;
                  return newJobs;
                });
              }}
            />
            <Input
              value={link ?? ''}
              label='Link na više informacija'
              onChange={(value) => {
                setJobs((prev) => {
                  const newJobs = [...prev];
                  newJobs[index].link = value;
                  return newJobs;
                });
              }}
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
              label='Detalji o oglasu'
            />
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleAdd} className={clsx(c.button, c.secondary)}>
          Dodaj oglas
        </button>
        <button onClick={handleSave} className={clsx(c.button, c.primary)}>
          Spremi
        </button>
      </div>
    </div>
  );
};
