import { SpeakerWithCompanyDto } from '@ddays-app/types';
import { useEffect } from 'react';
import clsx from 'clsx';

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

  useEffect(() => {
    const disableScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const disableKeyboardScroll = (e: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown'].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener('wheel', disableScroll, { passive: false });
      document.addEventListener('touchmove', disableScroll, { passive: false });
      document.addEventListener('keydown', disableKeyboardScroll);
    } else {
      document.removeEventListener('wheel', disableScroll);
      document.removeEventListener('touchmove', disableScroll);
      document.removeEventListener('keydown', disableKeyboardScroll);
    }

    return () => {
      document.removeEventListener('wheel', disableScroll);
      document.removeEventListener('touchmove', disableScroll);
      document.removeEventListener('keydown', disableKeyboardScroll);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={c.backdrop}>
      <div className={c.speakerModal} onClick={stopPropagation}>
        <img className={c.image} src={speaker.photo} alt='' />
        <div className={c.contentWrapper}>
          <h2>
            {speaker.firstName} {speaker.lastName}
          </h2>
          <h3>
            {speaker.title} @ {speaker.company?.name}
          </h3>
          <button className={clsx(c.button, c.grainyButton)}>
            {`[ `}
            REGISTRIRAJ SVOJ DOLAZAK
            {` ]`}
          </button>
        </div>
        <button className={c.closeButton} onClick={() => close()}>
          Zatvori
        </button>
      </div>
    </div>
  );
};

export default SpeakerModal;
