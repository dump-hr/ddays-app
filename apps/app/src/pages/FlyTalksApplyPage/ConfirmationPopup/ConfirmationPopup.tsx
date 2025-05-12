import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import c from './ConfirmationPopup.module.scss';
import Button from '@/components/Button';
import DuckFlyTalksConfirmationPng from '@/assets/images/duck-fly-talks-confirmation.png';
import { useNavigate } from 'react-router-dom';

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  group?: {
    id: number;
    start: string;
    end: string;
    participantsNumber: number;
    companies: {
      id: number;
      logoImage: string;
      name: string;
    }[];
    hasUserApplied: boolean;
  };
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  group,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/app/fly-talks');
  };
  return (
    <PopupLayout
      headerTitleComponent={'USPJEŠNA PRIJAVA!'}
      desktopStyle='normal'
      variant={'dark'}
      closePopup={onClose}
      isOpen={isOpen}>
      <div className={c.confirmationPopupContainer}>
        <p className={c.infoParagraph}>
          Uskoro ćemo te obavijestiti o rezultatu selekcije, a do tada istraži o
          tvrtkama iz skupine da ostaviš što bolji dojam.
        </p>
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
                <img src={company.logoImage} alt='' />
                {i !== 3 && <div className={c.divider}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant={'orange'}
        style={{ width: '100%' }}
        onClick={handleClose}>
        Dalje
      </Button>
    </PopupLayout>
  );
};

export default ConfirmationPopup;
