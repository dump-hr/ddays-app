import { CompanyPublicDto } from '@ddays-app/types';

import CloseSvg from '../../assets/close.svg';
import c from './SponsorSection.module.scss';

type SponsorModalProps = {
  sponsor?: CompanyPublicDto;
  close: () => void;
};

const SponsorModal: React.FC<SponsorModalProps> = ({ sponsor, close }) => {
  return (
    <div data-lenis-prevent className={c.modalBackground} onClick={close}>
      <div className={c.modal}>
        <div className={c.modalContainer} onClick={(e) => e.stopPropagation()}>
          <img src={CloseSvg} alt='Close' className={c.close} onClick={close} />
          alkfdjlkdasjfčlkdsjf
        </div>
      </div>
    </div>
  );
};

export default SponsorModal;
