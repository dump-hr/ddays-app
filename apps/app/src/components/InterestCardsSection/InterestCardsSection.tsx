import RemoveIcon from '@/assets/icons/remove-icon.svg';
import c from './InterestCardsSection.module.scss';
import { InterestDto } from '@ddays-app/types';
import { Theme } from '@ddays-app/types';

type InterestCardsSectionProps = {
  forUpdate?: boolean;
  interests: InterestDto[];
  userSelectedInterests: InterestDto[];
  setUserSelectedInterests: React.Dispatch<React.SetStateAction<string[]>>;
};

export const InterestCardsSection = ({
  forUpdate = false,
  interests,
  userSelectedInterests,
  setUserSelectedInterests,
}: InterestCardsSectionProps) => {
  const handleInterestClick = (interestName: string) => {
    if (!forUpdate || !setUserSelectedInterests) return;

    setUserSelectedInterests((prev) =>
      prev.includes(interestName)
        ? prev.filter((interest) => interest !== interestName)
        : [...prev, interestName],
    );
  };

  return (
    <>
      {Object.values(Theme).map((theme, i) => {
        <div className={c.interestsSection} key={i}>
          <h3>{theme}//</h3>
          <div className={c.interestsCardsWrapper}>
            {interests
              .filter((interest) => forUpdate || interest.theme == theme)
              .map((interest) => {
                const isSelected = userSelectedInterests.includes(interest);
                return (
                  <div
                    key={interest.id}
                    className={`${c.interestsCard} ${
                      isSelected ? c.selected : ''
                    } ${forUpdate ? c.clickable : ''}`}
                    onClick={
                      forUpdate
                        ? () => handleInterestClick(interest.name)
                        : undefined
                    }>
                    {interest.name}
                    {forUpdate && isSelected && (
                      <img
                        src={RemoveIcon}
                        alt='remove icon'
                        width={10}
                        height={10}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>;
      })}
      {/**
       *
       *{interestsSections.map((section) => {
        const filteredInterests = forUpdate
          ? section.interests
          : section.interests.filter((interest) =>
              userSelectedInterests.includes(interest),
            );

        if (filteredInterests.length === 0) return null;

        return (
          <div className={c.interestsSection} key={section.id}>
            <h3>{section.group}//</h3>

            <div className={c.interestsCardsWrapper}>
              {filteredInterests.map((interest) => {
                const isSelected = userSelectedInterests.includes(
                  interest.name,
                );

                return (
                  <div
                    key={interest.id}
                    className={`${c.interestsCard} ${
                      isSelected ? c.selected : ''
                    } ${forUpdate ? c.clickable : ''}`}
                    onClick={
                      forUpdate
                        ? () => handleInterestClick(interest.name)
                        : undefined
                    }>
                    {interest.name}
                    {forUpdate && isSelected && (
                      <img
                        src={RemoveIcon}
                        alt='remove icon'
                        width={10}
                        height={10}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
       *
       */}
    </>
  );
};
