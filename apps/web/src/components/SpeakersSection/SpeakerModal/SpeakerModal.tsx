import { SpeakerWithCompanyDto } from '@ddays-app/types';

import c from './SpeakerModal.module.scss';

type SpeakerModalProps = {
  close: () => void;
  isOpen: boolean;
  speaker: SpeakerWithCompanyDto;
};

const SpeakerModal = ({ close, isOpen, speaker }: SpeakerModalProps) => {
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent clicks inside the modal from bubbling to the parent
  };

  if (!isOpen) return null;

  return (
    <div className={c.speakerModal} onClick={stopPropagation}>
      <button onClick={() => close()}>Zatvori</button>
      <p>{speaker.firstName}</p>
    </div>
  );
};

export default SpeakerModal;
