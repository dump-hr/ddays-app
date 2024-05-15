import { useJobGetForCompany } from '../../api/job/useJobGetForCompany';

type Props = {
  sponsorId: number;
};

export const SponsorJobCount: React.FC<Props> = ({ sponsorId }) => {
  const { data: jobs } = useJobGetForCompany(sponsorId);

  return jobs?.length ?? 0;
};
