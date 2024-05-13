import { CompanyPublicDto } from '@ddays-app/types';

import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';
import CloseSvg from '../../assets/close.svg';
import c from './SponsorSection.module.scss';

type SponsorModalProps = {
  sponsor?: CompanyPublicDto;
  close: () => void;
};

const SponsorModal: React.FC<SponsorModalProps> = ({ sponsor, close }) => {
  const { data: jobs } = useJobGetForCompany(sponsor?.id);
  return (
    <div data-lenis-prevent className={c.modalBackground} onClick={close}>
      <div className={c.modal}>
        <div className={c.modalContainer} onClick={(e) => e.stopPropagation()}>
          <img src={CloseSvg} alt='Close' className={c.close} onClick={close} />
          <div>
            <h3>ZLATNI SPONZOR</h3>
            <h2>{sponsor?.name}</h2>
            <div>dev tech mark diz</div>
          </div>
          {jobs?.map((job) => (
            <div key={job.id}>
              <div>{job.position}</div>
              <div>{job.details}</div>
              <div>{job.location}</div>
              <div>{job.link}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorModal;
