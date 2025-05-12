import ClipboardPaster from '@/components/ClipboardPaster';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './CalendarLinkPopup.module.scss';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

type CalendarLinkPopupProps = {
  isOpen: boolean;
  closePopup: () => void;
};

const CalendarLinkPopup: React.FC<CalendarLinkPopupProps> = ({
  isOpen,
  closePopup,
}) => {
  const { data: user } = useLoggedInUser();

  const calendarLink = `webcal://days.dump.hr/api/event/schedule-ical/${user?.id}.ics`;

  return (
    <PopupLayout
      headerTitleComponent='Poveži s kalendarom'
      variant='light'
      isOpen={isOpen}
      closePopup={closePopup}>
      <p className={c.p}>
        Kopiraj poveznicu ispod i pomoću nje uvezi novi kalendar u aplikaciji
        koju koristiš (Google Calendar, Outlook, Apple Calendar ili slično).
      </p>
      <ClipboardPaster text={calendarLink} />
    </PopupLayout>
  );
};

export default CalendarLinkPopup;
