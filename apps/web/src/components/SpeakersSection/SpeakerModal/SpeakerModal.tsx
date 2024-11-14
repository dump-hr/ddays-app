import { SpeakerWithCompanyDto } from '@ddays-app/types';

import c from './SpeakerModal.module.scss';

type SpeakerModalProps = {
  close: () => void;
  isOpen: boolean;
  speaker: SpeakerWithCompanyDto;
};

const SpeakerModal = ({ close, isOpen, speaker }: SpeakerModalProps) => {
  return (
    <>
      {isOpen && (
        <div className={c.speakerModal}>
          <button onClick={() => close()}>Zatvori</button>
          <p>{speaker.firstName}</p>
        </div>
      )}
    </>
  );
};

export default SpeakerModal;
