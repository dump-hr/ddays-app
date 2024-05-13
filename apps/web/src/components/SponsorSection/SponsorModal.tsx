import { CompanyPublicDto } from '@ddays-app/types';
import clsx from 'clsx';

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
      <div data-lenis-prevent className={c.modal}>
        <div className={c.modalContainer} onClick={(e) => e.stopPropagation()}>
          <img src={CloseSvg} alt='Close' className={c.close} onClick={close} />
          <div className={c.modalHeader}>
            <h3 className={c.headerRedText}>ZLATNI SPONZOR</h3>
            <h2 className={c.headerBigText}>{sponsor?.name}</h2>
            <div className={c.themeBadgesContainer}>
              <div className={c.themeBadge}>
                <p className={c.themeBadgeText}>TECH</p>
              </div>
              <div className={c.themeBadge}>
                <p className={c.themeBadgeText}>MARK</p>
              </div>
              <div className={c.themeBadge}>
                <p className={c.themeBadgeText}>DIZ</p>
              </div>
              <div className={c.themeBadge}>
                <p className={c.themeBadgeText}>TECH</p>
              </div>
            </div>
          </div>
          <div className={c.jobsContainer}>
            {jobs?.map((job, index) => (
              <div key={job.id} className={c.jobCard}>
                <div className={c.dottedRuler}>
                  ...........................................................................................................................................................................................................................................................................................................................
                </div>
                <div className={c.verticalRuler}>
                  ..................................
                </div>
                <div className={c.jobCardInner}>
                  <img
                    className={c.modalLogoImage}
                    src={sponsor?.logoImage}
                    alt={sponsor?.name}
                  />
                  <div className={c.jobTitle}>{job.position}</div>
                  <div className={c.jobCardSmallText}>{sponsor?.name}</div>
                  <div className={c.jobCardSmallText}>{job.location}</div>
                  <div>{job.link}</div>
                </div>
                {index === jobs.length - 1 && (
                  <div className={clsx(c.verticalRuler, c.verticalRulerEnd)}>
                    ..................................
                  </div>
                )}
                <div className={clsx(c.dottedRuler, c.positionBottom)}>
                  ...........................................................................................................................................................................................................................................................................................................................
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorModal;
