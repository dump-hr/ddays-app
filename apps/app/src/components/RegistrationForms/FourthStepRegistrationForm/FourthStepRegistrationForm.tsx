import { useState } from 'react';
import c from './FourthStepRegistrationForm.module.scss';
import { interestsSections } from './temporaryMockData';

export const FourthStepRegistrationForm = () => {
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
              <div className={c.interestsCard} key={interest.id}>
                {interest.name}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <div className={c.interestsSection}>
        <h3>Programiranje//</h3>
        <div className={c.interestsCardsWrapper}>
          <div className={c.interestsCard}>Web development</div>
          <div className={c.interestsCard}>React</div>
          <div className={c.interestsCard}>3JS</div>
          <div className={c.interestsCard}>JavaScript</div>
          <div className={c.interestsCard}>Mobile Development</div>
        </div>
      </div> */}
    </div>
  );
};
