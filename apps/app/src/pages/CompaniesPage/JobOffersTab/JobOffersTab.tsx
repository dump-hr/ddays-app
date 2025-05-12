import SearchBar from '@/components/SearchBar';
import c from './JobOffersTab.module.scss';
import { jobOffers } from './jobOffers';
import JobOfferButton from '@/components/JobOfferButton';
import { useState } from 'react';
import { getCompanyName } from '@/helpers/getCompanyInfo';
import JobOfferPopup from '../popups/JobOfferPopup';
import { JobDto } from '@ddays-app/types';

const JobOffersTab = () => {
  const [query, setQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalJobOffer, setModalJobOffer] = useState<JobDto | null>(null);

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
        {jobOffers
          .filter(
            (job) =>
              job.position.toUpperCase().includes(query.toUpperCase()) ||
              getCompanyName(job.companyId)
                .toUpperCase()
                .includes(query.toUpperCase()),
          )
          .map((job) => (
            <JobOfferButton job={job} onClick={() => handleModalOpen(job)} />
          ))}
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
