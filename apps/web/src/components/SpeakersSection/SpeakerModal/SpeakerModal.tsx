import { SpeakerWithCompanyDto } from '@ddays-app/types';

type SpeakerModalProps = {
  close: () => void;
  isOpen: boolean;
  speaker: SpeakerWithCompanyDto;
};

const SpeakerModal = ({ close, isOpen, speaker }: SpeakerModalProps) => {
  return (
    <dialog open={isOpen}>
      <button onClick={() => close()}>Zatvori</button>
      <p>{speaker.firstName}</p>
    </dialog>
  );
};

export default SpeakerModal;
