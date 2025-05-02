import c from './index.module.scss';
import Button from '@/components/Button';
import { InterestCardsSection } from '@/components/InterestCardsSection/InterestCardsSection';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { InterestDto } from '@ddays-app/types';
import { Dispatch, SetStateAction } from 'react';

type InterestsForUpdatePopupProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tempSelectedInterests: InterestDto[];
  setTempSelectedInterests: Dispatch<SetStateAction<string[]>>;
  handleSaveInterests: () => void;
};
export const InterestsForUpdatePopup = ({
  isOpen,
  setIsOpen,
  tempSelectedInterests,
  setTempSelectedInterests,
  handleSaveInterests,
}: InterestsForUpdatePopupProps) => {
  return (
    <PopupLayout
      variant='light'
      headerTitleComponent='Uredi interese'
      closePopup={() => setIsOpen(false)}
      isOpen={isOpen}
      desktopStyle={'normal'}>
      <div className={c.interestsForUpdate}>
        <p>
          Odaberi svoje interese, a mi ćemo ti preporučiti poslodavce,
          predavanja i grupe za fly talk koje bi ti se mogle svidjeti.
        </p>

        <InterestCardsSection
          forUpdate
          interests={[]}
          userSelectedInterests={tempSelectedInterests}
          setUserSelectedInterests={setTempSelectedInterests}
        />
      </div>
      <Button
        variant='black'
        style={{ width: '100%' }}
        onClick={handleSaveInterests}>
        Spremi
      </Button>
    </PopupLayout>
  );
};
