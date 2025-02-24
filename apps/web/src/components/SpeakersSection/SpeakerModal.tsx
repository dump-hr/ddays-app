import { SpeakerWithCompanyDto } from '@ddays-app/types';
import { useEffect } from 'react';

import CloseSvg from '../../assets/close.svg';
import c from './SpeakersSection.module.scss';

type SpeakerModalProps = {
  close: () => void;
  isOpen: boolean;
  speaker: SpeakerWithCompanyDto;
};

const SpeakerModal: React.FC<SpeakerModalProps> = ({
  close,
  isOpen,
  speaker,
}) => {
  useEffect(() => {
    if (isOpen) {
      const width = document.body.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.width = `${width}px`;
    } else {
      document.body.style.overflow = 'visible';
      document.body.style.width = `auto`;
    }

    return () => {
      document.body.style.overflow = 'visible';
      document.body.style.width = `auto`;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div data-lenis-prevent className={c.modalBackground} onClick={close}>
      <div className={c.modal}>
        <div
          data-lenis-prevent
          className={c.container}
          onClick={(e) => e.stopPropagation()}>
          <img src={CloseSvg} alt='Close' className={c.close} onClick={close} />
          <div className={c.modalImage}>
            <img src={speaker.photoUrl} width={320} height={400} />
          </div>
          <div className={c.modalRight}>
            <h2 className={c.modalSpeakerName}>
              {speaker.firstName} {speaker.lastName}
            </h2>
            <h3 className={c.modalTitle}>
              {speaker.title}{' '}
              {speaker.company?.name ? '@ ' + speaker.company?.name : ''}
            </h3>
            <div className={c.socialsWrapper}>
              {speaker.linkedinUrl && (
                <a className={c.socialsLink} href={speaker.linkedinUrl}>
                  {`[`} LINKEDIN {']'}
                </a>
              )}
              {speaker.instagramUrl && (
                <a className={c.socialsLink} href={speaker.instagramUrl}>
                  {`[`} INSTAGRAM {']'}
                </a>
              )}
            </div>
            <section className={c.modalDescription}>
              {speaker.description}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerModal;
