import c from './AvatarPickerRegistrationForm.module.scss';
import { DuckList } from '.';
import Button from '@/components/Button';
import sprite from '../../../assets/sprite.svg';
import { FC, useState } from 'react';
import { DuckObject } from '@/constants';
import { UserDataFields } from '@/types/enums';

type UserData = {
  profilePhotoUrl: string;
};

type Props = {
  updateUserData: (newData: Partial<UserData>) => void;
};

export const AvatarPickerRegistrationForm: FC<Props> = ({ updateUserData }) => {
  const [selectedDuckUrl, setSelectedDuckUrl] = useState<string>('');

  const setSelectedDuck = (duck: DuckObject): void => {
    setSelectedDuckUrl(duck.imageSrc);
  };

  const handleAvatarSelected = (): void => {
    updateUserData({
      [UserDataFields.ProfilePhotoUrl]: selectedDuckUrl,
    });
  };

  return (
    <div>
      <DuckList setSelectedDuck={setSelectedDuck} />
      <div className={c.buttonGroup}>
        <PersonalizeAvatarIcon />
        <Button variant='orange' onClick={handleAvatarSelected}>
          Odaberi
        </Button>
      </div>
    </div>
  );
};

const PersonalizeAvatarIcon = () => {
  // TODO add redirect here
  return (
    <Button variant='beige'>
      <div className={c.buttonIcon}>
        <svg width={25} height={24}>
          <use href={`${sprite}#slavica-icon`} />
        </svg>
        Personaliziraj svoju
      </div>
    </Button>
  );
};
