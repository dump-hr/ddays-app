import FilmFrame from 'components/FilmFrame';
import { useEffect } from 'react';

import CloseSvg from '../../assets/close.svg';
import c from './SpeakersSection.module.scss';

type SpeakerModalProps = {
  close: () => void;
  imageSrc: string | undefined;
  firstName: string;
  lastName: string;
  title: string;
  width: number;
  height: number;
  isOpen: boolean;
  companyName: string | undefined;
};

const SpeakerModal: React.FC<SpeakerModalProps> = ({
  close,
  imageSrc,
  firstName,
  lastName,
  title,
  isOpen,
  companyName,
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
            <FilmFrame imageSrc={imageSrc} width={320} height={400} />
          </div>
          <div className={c.modalLeft}>
            <h2 className={c.modalSpeakerName}>
              {firstName} {lastName}
            </h2>
            <h3 className={c.modalTitle}>
              {title} {companyName ? '@ ' + companyName : ''}
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
