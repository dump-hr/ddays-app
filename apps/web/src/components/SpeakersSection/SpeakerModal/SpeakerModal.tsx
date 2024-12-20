import { SpeakerWithCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect } from 'react';

import CloseIcon from '../../../assets/icons/close.svg';
import c from './SpeakerModal.module.scss';

type SpeakerModalProps = {
  close: () => void;
  isOpen: boolean;
  speaker: SpeakerWithCompanyDto;
};

const SpeakerModal = ({ close, isOpen, speaker }: SpeakerModalProps) => {
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
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

  const openLink = (href: string | undefined) => {
    if (!href) return;
    window.open(href, '_blank');
  };

  return (
    <div className={c.backdrop}>
      <div className={c.speakerModal} onClick={stopPropagation}>
        <img className={c.image} src={speaker.photo} alt='' />
        <div className={c.contentWrapper}>
          <h2 className={c.fullName}>
            {speaker.firstName} {speaker.lastName}
          </h2>
          <h3 className={c.titleAndCompany}>
            {speaker.title} {speaker.title && speaker.company?.name && '@'}{' '}
            {speaker.company?.name}
          </h3>
          {speaker.linkedin ||
            (speaker.instagram && (
              <div className={c.socialMediaButtons}>
                {speaker.linkedin && (
                  <button
                    className={clsx(c.button, c.grainyButton)}
                    onClick={() => openLink(speaker.linkedin)}>
                    {`[ `}
                    LinkedIn
                    {` ]`}
                  </button>
                )}
                {speaker.instagram && (
                  <button
                    className={clsx(c.button, c.grainyButton)}
                    onClick={() => openLink(speaker.instagram)}>
                    {`[ `}
                    Instagram
                    {` ]`}
                  </button>
                )}
              </div>
            ))}
          <p className={c.description}>{speaker.description}</p>
        </div>
        <button className={c.closeButton} onClick={() => close()}>
          <img src={CloseIcon} />
        </button>
      </div>
    </div>
  );
};

export default SpeakerModal;
