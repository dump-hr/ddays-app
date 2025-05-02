import { useEffect, useState } from 'react';
import c from './FourthStepRegistrationForm.module.scss';
import RemoveIcon from '@/assets/icons/remove-icon.svg';
import { useInterestsGetAll } from '@/api/interests/useInterestsGetAll';
import { InterestDto, RegistrationDto, Theme } from '@ddays-app/types';

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

  const handleInterestClick = (interest: InterestDto) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }

      return [...prev, interest];
    });
  };

  useEffect(() => {
    updateUserData({ interests: selectedInterests });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInterests]);

  const interestsSections = Object.values(Theme);

  return (
    <div className={c.interests}>
      <p>
        Odaberi svoje interese, a mi ćemo ti preporučiti poslodavce, predavanja
        i grupe za fly talk koje bi ti se mogle svidjeti.
      </p>

      {interestsSections.map((theme, i) => (
        <div className={c.interestsSection} key={i}>
          <h3>{theme}//</h3>

          <div className={c.interestsCardsWrapper}>
            {interests
              ?.filter((interest) => interest.theme == theme)
              .map((interest) => (
                <div
                  className={`${c.interestsCard} ${
                    selectedInterests.includes(interest) ? c.selected : ''
                  }`}
                  key={interest.id}
                  onClick={() => handleInterestClick(interest)}>
                  {interest.name}
                  {selectedInterests.includes(interest) && (
                    <img
                      src={RemoveIcon}
                      alt='remove icon'
                      width={10}
                      height={10}></img>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
