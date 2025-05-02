import { useState } from 'react';
import c from './FourthStepRegistrationForm.module.scss';
import RemoveIcon from '@/assets/icons/remove-icon.svg';
import { useInterestsGetAll } from '@/api/interests/useInterestsGetAll';
import { Theme } from '@ddays-app/types';

export const FourthStepRegistrationForm = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const { data: interests } = useInterestsGetAll();

  const handleInterestClick = (interestName: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestName)) {
        return prev.filter((interest) => interest !== interestName);
      }

      return [...prev, interestName];
    });
  };

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
                    selectedInterests.includes(interest.name) ? c.selected : ''
                  }`}
                  key={interest.id}
                  onClick={() => handleInterestClick(interest.name)}>
                  {interest.name}
                  {selectedInterests.includes(interest.name) && (
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
