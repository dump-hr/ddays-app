import { ChangeEvent } from 'react';
import c from './CheckboxFieldsWrapper.module.scss';
import { Checkbox } from '../../Checkbox';
import { UserDataFields } from '../../../types/enums';

type UserData = {
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
};
type Props = {
  userData: UserData;
  updateUserData: (newData: Partial<UserData>) => void;
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
        checked={userData.newsletterEnabled}
        name={UserDataFields.NewsletterEnabled}
        onChange={handleCheckboxChange}
        key={1}
      />
      <Checkbox
        label='Želim primati novosti o tvrtkama i otvorenim radnim pozicijama.'
        checked={userData.companiesNewsEnabled}
        name={UserDataFields.CompaniesNewsEnabled}
        onChange={handleCheckboxChange}
        key={2}
      />
      <Checkbox
        label='Slažem se s uvjetima i odredbama.'
        checked={userData.termsAndConditionsEnabled}
        name={UserDataFields.TermsAndConditionsEnabled}
        onChange={handleCheckboxChange}
        key={3}
      />

      <p className={c.errorMessage}>{errorMessage}</p>
    </div>
  );
};
