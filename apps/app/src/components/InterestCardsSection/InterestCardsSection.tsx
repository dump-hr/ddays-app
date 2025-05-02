import c from './InterestCardsSection.module.scss';
import { InterestDto } from '@ddays-app/types';
import { Theme } from '@ddays-app/types';
import InterestCard from './InterestCard/InterestCard';

type InterestCardsSectionProps = {
  allowSelection?: boolean;
  interests: InterestDto[];
  selectedInterests: InterestDto[];
  setSelectedInterests?: React.Dispatch<React.SetStateAction<InterestDto[]>>;
};

export const InterestCardsSection = ({
  allowSelection = false,
  interests = [],
  selectedInterests,
  setSelectedInterests,
}: InterestCardsSectionProps) => {
  const handleInterestClick = (interest: InterestDto) => {
    if (!allowSelection || !setSelectedInterests) return;
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }

      return [...prev, interest];
    });
  };

  const interestsSections = Object.values(Theme);

  return (
    <>
      {interestsSections.map((theme, i) => (
        <div className={c.interestsSection} key={i}>
          <h3>{theme}//</h3>

          <div className={c.interestsCardsWrapper}>
            {interests
              ?.filter((interest) => interest.theme == theme)
              .map((interest) => (
                <InterestCard
                  interest={interest}
                  key={interest.id}
                  isSelected={selectedInterests.some(
                    (i) => i.id === interest.id,
                  )}
                  allowSelection={allowSelection}
                  handleInterestClick={handleInterestClick}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};
