import { useState } from 'react';
import c from './FourthStepRegistrationForm.module.scss';
import { interestsSections } from './temporaryMockData';
import removeIcon from './../../../assets/icons/remove-icon.svg';

export const FourthStepRegistrationForm = () => {
  const [userSelectedInterests, setUserSelectedInterests] = useState<string[]>(
    [],
  );

  const handleInterestClick = (interestName: string) => {
    setUserSelectedInterests((prev) => {
      if (prev.includes(interestName)) {
        return prev.filter((interest) => interest !== interestName);
      }

      return [...prev, interestName];
    });
  };

  return (
    <div className={c.interests}>
      <p>
        Odaberi svoje interese, a mi ćemo ti preporučiti poslodavce, predavanja
        i grupe za fly talk koje bi ti se mogle svidjeti.
      </p>

      {interestsSections.map((section) => (
        <div className={c.interestsSection} key={section.id}>
          <h3>{section.group}//</h3>

          <div className={c.interestsCardsWrapper}>
            {section.interests.map((interest) => (
              <div
                className={`${c.interestsCard} ${
                  userSelectedInterests.includes(interest.name)
                    ? c.selected
                    : ''
                }`}
                key={interest.id}
                onClick={() => handleInterestClick(interest.name)}>
                {interest.name}
                {userSelectedInterests.includes(interest.name) && (
                  <img
                    src={removeIcon}
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
