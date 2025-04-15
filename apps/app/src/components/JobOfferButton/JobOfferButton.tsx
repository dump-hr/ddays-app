import c from './JobOfferButton.module.scss';

import { JobDto } from '@ddays-app/types';
import ProficoLogo from '@/assets/images/Profico.svg';

type JobOfferButtonProps = {
  job: JobDto;
};

const JobOfferButton: React.FC<JobOfferButtonProps> = ({ job }) => {
  /**
   * Ideja je da se samo salje JobDto. Po volji ekstrahirat propove posebno.
   */
  function getCompanyName(companyId: number) {
    return `Profico (${companyId})`;
  }

  function getCompanyLogo(companyId: number) {
    if (companyId) return ProficoLogo;
    return ProficoLogo;
  }

  return (
    <div className={c.jobOfferButton}>
      <div className={c.logoWrapper}>
        <img src={getCompanyLogo(job.companyId)} alt='' />
      </div>
      <div className={c.mainContent}>
        <h4>{getCompanyName(job.companyId)}</h4>
        <p>{job.position}</p>
      </div>
    </div>
  );
};

export default JobOfferButton;
