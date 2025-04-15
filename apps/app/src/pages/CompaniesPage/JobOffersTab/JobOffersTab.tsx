import SearchBar from '@/components/SearchBar';
import c from './JobOffersTab.module.scss';
import { jobOffers } from './jobOffers';
import JobOfferButton from '@/components/JobOfferButton';

const JobOffersTab = () => {
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
      <SearchBar placeholder='Pretraži poslove' />
      {jobOffers.map((job) => (
        <JobOfferButton job={job} />
      ))}
    </section>
  );
};

export default JobOffersTab;
