import { SpeakerWithCompanyDto } from '@ddays-app/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

import SpeakerModal from './SpeakerModal';
import c from './SpeakersSection.module.scss';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
  width: number;
  height: number;
  isSemiHidden?: boolean;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  speaker,
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: 'easeIn', duration: 1 }}
        style={{ width: width }}
        className={c.card}
        onClick={handleOpenModal}>
        <img src={speaker.photo} height={height} width={width} />
        <div className={c.cardInfoWrapper}>
          <h3 className={c.cardName}>
            {speaker.firstName} {speaker.lastName}
          </h3>
          <p className={c.cardTitle}>{speaker.title} </p>
          {speaker.company?.name && (
            <p className={c.cardCompanyName}>@ {speaker.company.name}</p>
          )}
        </div>
        <SpeakerModal
          close={handleCloseModal}
          isOpen={isOpenModal}
          speaker={speaker}
        />
      </motion.div>
    </>
  );
};

export default SpeakerCard;
