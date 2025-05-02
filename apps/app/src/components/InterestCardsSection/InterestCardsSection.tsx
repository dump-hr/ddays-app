import RemoveIcon from '@/assets/icons/remove-icon.svg';
import c from './InterestCardsSection.module.scss';
import { InterestDto } from '@ddays-app/types';
import { Theme } from '@ddays-app/types';

type InterestCardsSectionProps = {
  interests?: InterestDto[];
  selectedInterests: InterestDto[];
  setSelectedInterests: React.Dispatch<React.SetStateAction<InterestDto[]>>;
};

export const InterestCardsSection = ({
  interests = [],
  selectedInterests,
  setSelectedInterests,
}: InterestCardsSectionProps) => {
  const handleInterestClick = (interest: InterestDto) => {
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
    </>
  );
};
