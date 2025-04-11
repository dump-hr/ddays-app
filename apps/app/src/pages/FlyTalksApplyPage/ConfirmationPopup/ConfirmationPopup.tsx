import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './ConfirmationPopup.module.scss';
import Button from '@/components/Button';
import DuckFlyTalksConfirmationPng from '@/assets/images/duck-fly-talks-confirmation.png';

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  group?: {
    id: number;
    start: string;
    end: string;
    day: number;
    participantsNumber: number;
    companies: string[];
    hasUserApplied: boolean;
  };
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  group,
}) => {
  console.log(group);

  return (
    <PopupLayout
      headerTitleComponent={'Uspješna prijava!'}
      desktopStyle='normal'
      variant={'dark'}
      closePopup={onClose}
      isOpen={isOpen}>
      <img
        src={DuckFlyTalksConfirmationPng}
        alt='duck-flytalks-confirmation'
        className={c.duckFlyTalksConfirmationImage}
      />
      <div className={c.grupContainer}>
        <p className={c.groupDuration}>
          {group?.start} - {group?.end}
        </p>
        <div className={c.companiesList}>
          {group?.companies.map((company, i) => (
            <div key={i} className={c.company}>
              <p>0{i + 1}</p>
              <img src={company} alt='' />
              {i !== 3 && <div className={c.divider}></div>}
            </div>
          ))}
        </div>
      </div>
      <p className={c.infoParagraph}>
        Nakon prijave moraš čekati firme da potvrde ili odbiju tvoju prijavu, pa
        ćeš dobit notifikaciju o tome.
      </p>
      <Button variant={'black'} className={c.closeButton} onClick={onClose}>
        Zatvori
      </Button>
    </PopupLayout>
  );
};

export default ConfirmationPopup;
