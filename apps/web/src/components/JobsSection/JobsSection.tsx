import { CompanyPublicDto, JobDto } from '@ddays-app/types';
import arrowIcon from 'assets/icons/job-arrow.svg';
import stampBgTexture from 'assets/images/stamp-bg-texture.png';
import stampUnion from 'assets/images/stamp-union.svg';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { useJobGetAll } from '../../api/job/useJobGetAll';
import { useGetAllSponsors } from '../../api/sponsor/useGetAllSponsors';
import c from './JobsSection.module.scss';

type JobWithCompany = JobDto & {
  company?: CompanyPublicDto;
};

const JobsSection = () => {
  const { data: jobs } = useJobGetAll();
  const { data: companies } = useGetAllSponsors();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const jobsWithCompany: JobWithCompany[] = useMemo(() => {
    if (!jobs || !companies) return [];

    const companyMap = new Map(companies.map((comp) => [comp.id, comp]));

    return jobs
      .filter((job) => {
        const company = companyMap.get(job.companyId);
        return company && !company.name.startsWith('#');
      })
      .map((job) => ({
        ...job,
        company: companyMap.get(job.companyId),
      }));
  }, [jobs, companies]);

  if (!jobsWithCompany.length) return null;

  const handleRowClick = (job: JobWithCompany) => {
    if (job.link) {
      window.open(job.link, '_blank');
    }
  };

  return (
    <section className={c.jobsSection}>
      <div className={c.wrapper}>
        <h2 className={c.title}>
          Izgledaš
          <br />— nezaposleno
        </h2>
        <div className={c.list}>
          {jobsWithCompany.map((job, index) => {
            const isHovered = hoveredIndex === index;
            const logoImage = job.company?.logoImage;

            return (
              <div
                key={job.id}
                className={clsx(c.row, {
                  [c.rowHovered]: isHovered,
                  [c.rowClickable]: !!job.link,
                })}
                onClick={() => handleRowClick(job)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div className={c.rowContent}>
                  <p className={c.position}>{job.position}</p>
                  <p className={c.companyName}>{job.company?.name}</p>
                </div>
                <img src={arrowIcon} alt='' className={c.arrow} />
                {isHovered && logoImage && (
                  <div className={c.stamp}>
                    <div className={c.stampInner}>
                      <img
                        src={stampUnion}
                        className={c.stampShape}
                        alt=''
                      />
                      <img
                        src={stampBgTexture}
                        className={c.stampTexture}
                        alt=''
                      />
                      <img
                        src={logoImage}
                        className={c.stampLogo}
                        alt={job.company?.name}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
