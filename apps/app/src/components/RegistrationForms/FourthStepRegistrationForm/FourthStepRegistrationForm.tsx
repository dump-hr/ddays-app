import { useEffect, useState } from 'react';
import c from './FourthStepRegistrationForm.module.scss';
import { useInterestsGetAll } from '@/api/interests/useInterestsGetAll';
import { InterestDto, RegistrationDto } from '@ddays-app/types';
import { InterestCardsSection } from '@/components/InterestCardsSection/InterestCardsSection';

type Props = {
  userData: Partial<RegistrationDto>;
  updateUserData: (newData: Partial<RegistrationDto>) => void;
};

export const FourthStepRegistrationForm: React.FC<Props> = ({
  userData,
  updateUserData,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<InterestDto[]>(
    userData.interests || [],
  );

  const { data: interests } = useInterestsGetAll();

  useEffect(() => {
    updateUserData({ interests: selectedInterests });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInterests]);

  return (
    <div className={c.interests}>
      <p>
        Odaberi svoje interese, a mi ćemo ti preporučiti poslodavce, predavanja
        i grupe za fly talk koje bi ti se mogle svidjeti.
      </p>

      <InterestCardsSection
        allowSelection
        interests={interests || []}
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
      />
    </div>
  );
};
