import FilmFrame from 'components/FilmFrame';
import { useState } from 'react';

import SpeakerModal from './SpeakerModal';
import c from './SpeakersSection.module.scss';

type SpeakerCardProps = {
  imageSrc: string | undefined;
  firstName: string;
  lastName: string;
  title: string;
  width: number;
  height: number;
  handleClick: () => void;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  imageSrc,
  firstName,
  lastName,
  title,
  width,
  height,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (!isOpenModal) {
      setIsOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <div
        style={{ width: width }}
        className={c.card}
        onClick={handleOpenModal}>
        <FilmFrame imageSrc={imageSrc} height={height} width={width} />
        <div className={c.cardInfoWrapper}>
          <h3 className={c.cardName}>
            {firstName} {lastName}
          </h3>
          <p className={c.cardTitle}>{title}</p>
        </div>
      </div>
      <SpeakerModal
        close={handleCloseModal}
        isOpen={isOpenModal}
        imageSrc={imageSrc}
        firstName={firstName}
        lastName={lastName}
        title={title}
        width={width}
        height={height}
      />
    </>
  );
};

export default SpeakerCard;
