import { EventTheme, Interest } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useGetSponsorInterest } from '../../api/useGetSponsorInterests';
import { useUpdateSponsorInterests } from '../../api/useUpdateSponsorInterests';
import { interestLabels } from '../../constants/labels';
import { toggleArrayElement } from '../../helpers';
import { FormComponent } from '../../types/form';
import c from './InterestPicker.module.scss';

export const InterestPicker: FormComponent = () => {
  const { data: interests } = useGetSponsorInterest();
  const [activeInterests, setActiveInterests] = useState<Interest[]>([]);
  const [currentTheme, setCurrentTheme] = useState(EventTheme.Dev);
  const { mutate: updateSponsorInterests } = useUpdateSponsorInterests();

  useEffect(() => {
    setActiveInterests(interests?.filter((i) => i.isActive) ?? []);
  }, [interests]);

  const getInterestCount = (theme: EventTheme) =>
    activeInterests.filter((interest) => interest.theme === theme).length;

  const handleSave = () =>
    updateSponsorInterests({
      ids: activeInterests.map((interest) => interest.id),
    });

  const toggleInterest = (interest: Interest) => {
    const MAX_NUMBER_OF_INTERESTS = 6;
    if (
      !activeInterests.includes(interest) &&
      activeInterests.filter((i) => i.theme === interest.theme).length ===
        MAX_NUMBER_OF_INTERESTS
    )
      return toast.error('Maksimalan broj interesa po temi dosegnut!');

    setActiveInterests((prev) => toggleArrayElement(prev, interest));
  };

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
              onClick={() => toggleInterest(interest)}
              className={clsx(c.pill, {
                [c.active]: activeInterests.includes(interest),
              })}
              key={interest.id}>
              {interest.name}
            </div>
          ))}
      </div>

      <button onClick={handleSave} className={c.button}>
        Spremi
      </button>
    </div>
  );
};
