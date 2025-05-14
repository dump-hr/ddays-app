import { useInterestsGetAll } from '@/api/interests/useInterestsGetAll';
import c from './InterestsForUpdatePopup.module.scss';
import Button from '@/components/Button';
import { InterestCardsSection } from '@/components/InterestCardsSection/InterestCardsSection';
import PopupLayout from '@/layout/PopupLayout/PopupLayout';
import { InterestDto } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { useUserInterestsUpdate } from '@/api/interests/useUserInterestsUpdate';
import toast from 'react-hot-toast';

type InterestsForUpdatePopupProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultInterests: InterestDto[];
};
export const InterestsForUpdatePopup = ({
  isOpen,
  setIsOpen,
  defaultInterests,
}: InterestsForUpdatePopupProps) => {
  const [selectedInterests, setSelectedInterests] =
    useState<InterestDto[]>(defaultInterests);

  const { mutate: updateUserInterests } = useUserInterestsUpdate();

  useEffect(() => {
    setSelectedInterests(defaultInterests);
  }, [defaultInterests]);

  const { data: interests } = useInterestsGetAll();

  const handleSaveInterests = () => {
    updateUserInterests(selectedInterests, {
      onError() {
        toast.error('Došlo je do pogreške prilikom spremanja interesa.', {
          position: 'top-center',
        });
      },
      onSuccess() {
        toast.success('Interesi su uspješno spremljeni.', {
          position: 'top-center',
        });
      },
    });
    setIsOpen(false);
  };

  return (
    <PopupLayout
      variant='light'
      headerTitleComponent='Uredi interese'
      closePopup={() => setIsOpen(false)}
      isOpen={isOpen}
      desktopStyle={'normal'}>
      <div className={c.interestsForUpdate}>
        <p>
          Odaberi svoje interese, a mi ćemo ti prema njima preporučiti
          predavanja, panele, tvrtke i grupe za fly talks.
        </p>

        <InterestCardsSection
          allowSelection={true}
          interests={interests || []}
          selectedInterests={selectedInterests}
          setSelectedInterests={setSelectedInterests}
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
