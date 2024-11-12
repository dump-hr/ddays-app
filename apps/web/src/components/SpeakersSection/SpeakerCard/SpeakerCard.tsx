import { SpeakerWithCompanyDto } from '@ddays-app/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import c from './SpeakerCard.module.scss';

type SpeakerCardProps = {
  speaker: SpeakerWithCompanyDto;
} & React.HTMLAttributes<HTMLDivElement>;

const SpeakerCard = ({
  speaker,
  className /*, ...handlers*/,
}: SpeakerCardProps) => {
  const classes = clsx(c.speakerCard, className);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: 'easeIn', duration: 1 }}
      className={classes}
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
    </motion.div>
  );
};

export default SpeakerCard;
