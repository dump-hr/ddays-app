import { CompanyCategory, JobModifyForCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';
import { useJobUpdateForCompany } from '../../api/job/useJobUpdateForCompany';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { FormComponent } from '../../types/form';
import c from './Job.module.scss';
import { getMaxJobsPerTier } from './utils';

export const Job: FormComponent = ({ close }) => {
  const ref = useRef(true);

  const [jobs, setJobs] = useState<JobModifyForCompanyDto[]>([]);
  const [displayErrors, setDisplayErrors] = useState(false);

  const { data: company } = useCompanyGetCurrentPublic();
  const { data: companyJobs } = useJobGetForCompany(company?.id);

  const { mutateAsync: updateSponsorJobs } = useJobUpdateForCompany();

  useEffect(() => {
    if (jobs.length) return;
    if (ref.current) {
      setJobs(companyJobs ?? []);
      ref.current = false;
    }
  }, [companyJobs, jobs]);

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
    setJobs((prev) => prev.filter((_, i) => i !== idToRemove));
  };

  const handleSave = async () => {
    const jobsToSave = jobs.filter(isValid);

    if (jobsToSave.length === jobs.length) {
      await updateSponsorJobs(jobsToSave);
      close();
      return;
    }

    toast.error('Nisu uneseni svi potrebni podaci.');
    setDisplayErrors(true);
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
        {jobs.map(({ details, location, position, link }, index) => (
          <div key={index} className={c.inputContainer}>
            <div className={c.subtitleContainer}>
              <h2 className={c.subtitle}>
                #{index + 1} Oglas{' '}
                {!isValid({ details, location, position, link }) &&
                  displayErrors && (
                    <span className={c.error}>(nepotpuni podaci)</span>
                  )}
              </h2>
              <span onClick={() => handleRemove(index)} className={c.label}>
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
              label='Mjesto rada'
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
              label='Opis pozicije (ključne odgovornosti i kvalifikacije)'
            />
          </div>
        ))}
      </div>

      <div>
        {jobs.length <
          getMaxJobsPerTier(company?.category as CompanyCategory) && (
          <button onClick={handleAdd} className={clsx(c.button, c.secondary)}>
            Dodaj oglas
          </button>
        )}
        <button onClick={handleSave} className={clsx(c.button, c.primary)}>
          Spremi
        </button>
      </div>
    </div>
  );
};
