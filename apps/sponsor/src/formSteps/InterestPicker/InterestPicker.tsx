import { EventTheme, Interest } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { useGetSponsorInterest } from '../../api/useGetSponsorInterests';
import { interestLabels } from '../../constants/labels';
import { toggleArrayElement } from '../../helpers';
import { FormComponent } from '../../types/form';
import c from './InterestPicker.module.scss';

const InterestPicker: FormComponent = ({ close }) => {
  const { data: interests } = useGetSponsorInterest();
  const [activeInterests, setActiveInterests] = useState<Interest[]>([]);
  const [currentTheme, setCurrentTheme] = useState(EventTheme.Dev);

  useEffect(() => {
    setActiveInterests(interests?.filter((i) => i.isActive) ?? []);
  }, [interests]);

  const getInterestCount = (theme: EventTheme) =>
    activeInterests.filter((interest) => interest.theme === theme).length;

  return (
    <div className={c.container}>
      <h1 className={c.title}>App Career matching</h1>
      <p className={c.description}>
        Odaberite tehnologije i područja koja najbolje opisuju vašu tvrtku.
        Selekcija će nam olakšati povezivanje s kandidatima čiji interesi i
        sposobnosti odgovaraju potrebama vaše tvrtke.
      </p>

      <div className={c.themes}>
        {Object.values(EventTheme).map((theme) => (
          <p
            onClick={() => setCurrentTheme(theme)}
            className={clsx(c.themeLabel, {
              [c.selected]: currentTheme === theme,
              [c.empty]: getInterestCount(theme) === 0,
            })}
            key={theme}>
            {interestLabels[theme]} ({getInterestCount(theme)})
          </p>
        ))}
      </div>

      <div className={c.wrapper}>
        {interests
          ?.filter((i) => i.theme === currentTheme)
          .map((interest) => (
            <div
              onClick={() =>
                setActiveInterests((prev) => toggleArrayElement(prev, interest))
              }
              className={clsx(c.pill, {
                [c.active]: activeInterests.includes(interest),
              })}
              key={interest.id}>
              {interest.name}
            </div>
          ))}
      </div>

      <button onClick={close} className={c.button}>
        Nastavi
      </button>
    </div>
  );
};

export default InterestPicker;
