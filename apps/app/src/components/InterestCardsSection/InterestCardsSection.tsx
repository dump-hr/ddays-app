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
      if (prev.some((i) => i.id === interest.id)) {
        return prev.filter((i) => i.id !== interest.id);
      }

      return [...prev, interest];
    });
  };

  const interestsSections = Object.values(Theme);

  function adjustThemeName(theme: string) {
    if (theme === 'DEV') return 'PROGRAMIRANJE';
    if (theme === 'DESIGN') return 'DIZAJN';
    return theme;
  }

  if (selectedInterests.length === 0 && !allowSelection) {
    return (
      <div className={c.sectionWrapper}>
        <div className={c.interestsSection}>
          <p className={c.noInterestsText}>Nije odabran niti jedan interes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={c.sectionWrapper}>
      {interestsSections.map((theme, i) => {
        const isThemeSelected = selectedInterests.some(
          (interest) => interest.theme === theme,
        );

        if (!isThemeSelected && !allowSelection) return null;

        return (
          <div className={c.interestsSection} key={i}>
            <h3>{adjustThemeName(theme)}//</h3>

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
        );
      })}
    </div>
  );
};
