import { CompanyPublicDto } from '@ddays-app/types';

type SponsorModalProps = {
  sponsor?: CompanyPublicDto;
  close: () => void;
};

const SponsorModal = ({ sponsor, close }) => {
  return <div>modal</div>;
};

export default SponsorModal;
