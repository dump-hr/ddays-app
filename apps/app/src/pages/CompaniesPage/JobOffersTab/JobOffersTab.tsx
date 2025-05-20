import SearchBar from '@/components/SearchBar';
import c from './JobOffersTab.module.scss';
import JobOfferButton from '@/components/JobOfferButton';
import { useMemo, useState } from 'react';
import JobOfferPopup from '../popups/JobOfferPopup';
import { JobDto } from '@ddays-app/types';
import { useGetAllCompanies } from '@/api/company/useGetAllCompanies';
import { useGetAllJobs } from '@/api/job/useGetAllJobs';

const JobOffersTab = () => {
  const [query, setQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalJobOffer, setModalJobOffer] = useState<JobDto | null>(null);
  const { data: jobs } = useGetAllJobs();
  const { data: companies } = useGetAllCompanies();

  const companyNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    companies?.forEach((company) => {
      map[company.id] = company.name;
    });
    return map;
  }, [companies]);

  const filteredJobs = jobs?.filter((job) => {
    const companyName = companyNameMap[job.companyId] || '';

    if (companyName.startsWith('#')) return false;

    return (
      job.position.toUpperCase().includes(query.toUpperCase()) ||
      companyName.toUpperCase().includes(query.toUpperCase())
    );
  });

  function handleModalOpen(job: JobDto) {
    setModalJobOffer(job);
    setModalIsOpen(true);
  }

  return (
    <section className={c.section}>
      <div className={c.introduction}>
        <h3 className={c.sectionTitle}>Otvorene pozicije</h3>
        <p className={c.paragraph}>
          Tražiš posao i ne znaš odakle krenuti? Pogledaj otvorene pozicije i
          pronađi priliku koja odgovara tvojim interesima.
        </p>
        <p className={c.paragraph}>
          Prijavi se - možda je baš jedna od ovih prilika idealna za tebe!
        </p>
      </div>
      <SearchBar
        placeholder='Pretraži poslove'
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <div className={c.jobOffersWrapper}>
        {filteredJobs?.length ? (
          filteredJobs?.map((job) => (
            <JobOfferButton
              key={job.id}
              job={job}
              onClick={() => handleModalOpen(job)}
            />
          ))
        ) : (
          <p className={c.noJobs}>
            Nažalost nema otvorenih pozicija sa tim naslovom ili imenom tvrtke
          </p>
        )}
      </div>

      <JobOfferPopup
        isOpen={modalIsOpen}
        closePopup={() => setModalIsOpen(false)}
        job={modalJobOffer}
      />
    </section>
  );
};

export default JobOffersTab;
