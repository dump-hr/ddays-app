import clsx from 'clsx';
import Button from '@/components/Button';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import styles from './WorkshopConfirmPopup.module.scss';
import { PropsWithChildren, useState } from 'react';
import { ScheduleCardPreview } from '@/components/ScheduleCard';
import { EventWithSpeakerDto } from '@ddays-app/types';
import { useEventGetParticipantsCount } from '@/api/event/useEventGetParticipantsCount';

interface WorkshopConfirmPopupProps {
  closePopup: () => void;
  isOpen: boolean;
  event: EventWithSpeakerDto;
  handleAddToPersonalSchedule: () => void;
}

const WorkshopConfirmPopup = ({
  closePopup,
  isOpen,
  handleAddToPersonalSchedule,
  event,
  children,
}: PropsWithChildren<WorkshopConfirmPopupProps>) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { data: eventParticipantsCount } = useEventGetParticipantsCount(
    event.id,
  );

  const isEventFull = eventParticipantsCount?.count === event.maxParticipants;

  const handleConfirmClick = () => {
    handleAddToPersonalSchedule();
    setIsConfirmed(true);
  };

  const handleCloseClick = () => {
    setIsConfirmed(false);
    closePopup();
  };

  if (isConfirmed) {
    return (
      <PopupLayout
        headerTitleComponent={<>Uspješno prijavljena!</>}
        variant='light'
        isOpen={isOpen}
        closePopup={closePopup}
        justifyContent='end'>
        <div className={styles.contentDiv}>
          <p className={styles.note}>
            Radionica je uspješno prijavljena. Ne zaboravi na zahtjeve, vidimo
            se!
          </p>
          <ScheduleCardPreview event={event} />
          <Button
            variant='orange'
            className={styles.button}
            onClick={handleCloseClick}>
            ZATVORI
          </Button>
        </div>
      </PopupLayout>
    );
  }

  return (
    <PopupLayout
      headerTitleComponent={<>Zahtjev za radionicu</>}
      variant='light'
      isOpen={isOpen}
      closePopup={closePopup}
      justifyContent='end'>
      <div className={styles.contentDiv}>
        <p className={styles.note}>
          Za uspješnu prijavu potrebno je potvrditi da ćeš ispuniti sve zahtjeve
          za sudjelovanje na radionici.
        </p>
        {children}
        <Button
          variant='orange'
          className={clsx(styles.button, {
            [styles.disabled]: isEventFull,
          })}
          onClick={handleConfirmClick}
          disabled={isEventFull}>
          {isEventFull ? 'POPUNJENO' : 'POTVRDI'}
        </Button>
      </div>
    </PopupLayout>
  );
};

export default WorkshopConfirmPopup;
