import { SpeakerWithCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import SpeakerModal from '../SpeakerModal';
import c from './SpeakerCard.module.scss';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
} & React.HTMLAttributes<HTMLDivElement>;

const SpeakerCard = ({
  speaker,
  className /*, ...handlers*/,
}: SpeakerCardProps) => {
  const classes = clsx(c.speakerCard, className);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: 'easeIn', duration: 1 }}
        className={classes}
        onClick={() => openModal()}
        //{...handlers} <-- Zbog ovoga ne radi modion.div
      >
        <img className={c.image} src={speaker.photo} alt='' />
        <p className={c.fullName}>
          {speaker.firstName} {speaker.lastName}
        </p>
        {speaker.title && speaker.company?.name && (
          <p className={c.position}>
            {speaker.title} @ {speaker.company?.name}
          </p>
        )}
        <SpeakerModal
          speaker={speaker}
          isOpen={isModalOpen}
          close={() => closeModal()}
        />
      </motion.div>
    </>
  );
};

export default SpeakerCard;
