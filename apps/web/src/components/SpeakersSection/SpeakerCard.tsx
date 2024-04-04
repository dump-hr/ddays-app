import FilmFrame from 'components/FilmFrame';
import { motion } from 'framer-motion';
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
  companyName: string | undefined;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  imageSrc,
  firstName,
  lastName,
  title,
  width,
  height,
  companyName,
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: 'easeIn', duration: 1 }}
        style={{ width: width }}
        className={c.card}
        onClick={handleOpenModal}>
        <FilmFrame imageSrc={imageSrc} height={height} width={width} />
        <div className={c.cardInfoWrapper}>
          <h3 className={c.cardName}>
            {firstName} {lastName}
          </h3>
          <p className={c.cardTitle}>
            {title} {companyName ? '@ ' + companyName : ''}
          </p>
        </div>
      </motion.div>
      <SpeakerModal
        close={handleCloseModal}
        isOpen={isOpenModal}
        imageSrc={imageSrc}
        firstName={firstName}
        lastName={lastName}
        title={title}
        companyName={companyName}
        width={width}
        height={height}
      />
    </>
  );
};

export default SpeakerCard;
