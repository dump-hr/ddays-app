import { ChangeEvent } from 'react';
import c from './CheckboxFieldsWrapper.module.scss';
import { Checkbox } from '@/components/Checkbox';
import { UserDataFields } from '@/types/enums';
import { RouteNames } from '@/router/routes';
import { RegistrationDto } from '@/types/user/user';

type Props = {
  userData: Partial<RegistrationDto>;
  updateUserData: (newData: Partial<RegistrationDto>) => void;
  errorMessage: string | undefined;
};

export const CheckboxFieldsWrapper = ({
  userData,
  updateUserData,
  errorMessage,
}: Props) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateUserData({ [name]: checked });
  };

  return (
    <div className={c.checkboxFieldsWrapper}>
      <Checkbox
        label='Želim primati novosti o DUMP Days konferenciji.'
        checked={userData.newsletterEnabled as boolean}
        name={UserDataFields.NewsletterEnabled}
        onChange={handleCheckboxChange}
        key={1}
      />
      <Checkbox
        label='Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.'
        checked={userData.companiesNewsEnabled as boolean}
        name={UserDataFields.CompaniesNewsEnabled}
        onChange={handleCheckboxChange}
        key={2}
      />
      <Checkbox
        label='Slažem se s uvjetima i odredbama.'
        checked={userData.termsAndConditionsEnabled as boolean}
        name={UserDataFields.TermsAndConditionsEnabled}
        onChange={handleCheckboxChange}
        key={3}
      />
      <a className={c.link} href={RouteNames.TERMS_AND_CONDITIONS}>
        Pregledaj uvjete i odredbe.
      </a>

      <p className={c.errorMessage}>{errorMessage}</p>
    </div>
  );
};
