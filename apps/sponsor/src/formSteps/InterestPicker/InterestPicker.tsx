import { InterestDto, Theme } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useCompanyGetCurrentPublic } from '../../api/company/useCompanyGetCurrentPublic';
import { useInterestConnectToCompany } from '../../api/interest/useInterestConnectToCompany';
import { useInterestGetAll } from '../../api/interest/useInterestGetAll';
import { interestLabels } from '../../constants/labels';
import { toggleArrayElement } from '../../helpers';
import { FormComponent } from '../../types/form';
import c from './InterestPicker.module.scss';

const MAX_NUMBER_OF_INTERESTS = 6;

export const InterestPicker: FormComponent = () => {
  const { data: company } = useCompanyGetCurrentPublic();
  const { data: interests } = useInterestGetAll();
  const connectInterests = useInterestConnectToCompany();

  const [activeInterests, setActiveInterests] = useState<InterestDto[]>([]);
  const [currentTheme, setCurrentTheme] = useState(Theme.Dev);

  useEffect(() => {
    if (!interests || !company?.interests) return;

    const companyInterests = company.interests
      .map((ci) => interests.find((i) => i.id === ci.id))
      .filter((ci) => !!ci) as InterestDto[];

    setActiveInterests(companyInterests);
  }, [company?.interests, interests]);

  const getInterestCount = (theme: Theme) =>
    activeInterests.filter((interest) => interest.theme === theme).length;

  const handleSave = async () => {
    await connectInterests.mutateAsync({
      interestIds: activeInterests.map((interest) => interest.id),
    });
  };

  const toggleInterest = (interest: InterestDto) => {
    if (
      !activeInterests.includes(interest) &&
      activeInterests.filter((ai) => ai.theme === interest.theme).length ===
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
        {Object.values(Theme).map((theme) => (
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
