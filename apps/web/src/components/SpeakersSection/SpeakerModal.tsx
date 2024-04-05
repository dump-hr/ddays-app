import { SpeakerWithCompanyDto } from '@ddays-app/types';
import FilmFrame from 'components/FilmFrame';
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
    <div className={c.modalBackground} onClick={close}>
      <div className={c.modal}>
        <div className={c.container} onClick={(e) => e.stopPropagation()}>
          <img src={CloseSvg} alt='Close' className={c.close} onClick={close} />
          <div className={c.modalImage}>
            <FilmFrame imageSrc={speaker.photo} width={320} height={400} />
          </div>
          <div className={c.modalLeft}>
            <h2 className={c.modalSpeakerName}>
              {speaker.firstName} {speaker.lastName}
            </h2>
            <h3 className={c.modalTitle}>
              {speaker.title}{' '}
              {speaker.company?.name ? '@ ' + speaker.company?.name : ''}
            </h3>
            <section className={c.modalDescription}>
              description triba dodat polje... Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nostrum mollitia nisi debitis ad
              inventore, in iste placeat temporibus id qui, deserunt a aliquam
              minima atque, molestias cumque explicabo? Atque, fugiat?
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerModal;
