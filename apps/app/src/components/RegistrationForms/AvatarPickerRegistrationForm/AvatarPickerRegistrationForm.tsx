import c from './AvatarPickerRegistrationForm.module.scss';
import { DuckList } from '.';
import Button from '@/components/Button';
import sprite from '../../../assets/sprite.svg';
import { FC, useState } from 'react';
import { UserDataFields } from '@/types/enums';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteNames, routes } from '@/router/routes';
import { DuckObject } from '@/types/avatar/avatar';

type UserData = {
  profilePhotoUrl: string;
};

type Props = {
  updateUserData: (newData: Partial<UserData>) => void;
};

export const AvatarPickerRegistrationForm: FC<Props> = ({ updateUserData }) => {
  const [selectedDuckUrl, setSelectedDuckUrl] = useState<string>('');
  const navigate = useNavigate();

  const setSelectedDuck = (duck: DuckObject): void => {
    setSelectedDuckUrl(duck.imageSrc);
  };

  const handleAvatarSelected = (): void => {
    updateUserData({
      [UserDataFields.ProfilePhotoUrl]: selectedDuckUrl,
    });
    goToNextStep();
  };

  const goToNextStep = () => {
    navigate(location.pathname, {
      state: { profilePhotoUrl: selectedDuckUrl },
    });
  };

  return (
    <div>
      <DuckList setSelectedDuck={setSelectedDuck} />
      <div className={c.buttonGroup}>
        <PersonalizeAvatarIcon />
        <Button
          variant='orange'
          onClick={handleAvatarSelected}
          disabled={!selectedDuckUrl}>
          Odaberi
        </Button>
      </div>
    </div>
  );
};

const PersonalizeAvatarIcon = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <Button
      variant='beige'
      onClick={() =>
        navigate(routes[RouteNames.PROFILE_AVATARS].path, {
          state: { returnUrl: currentPath },
        })
      }>
      <div className={c.buttonIcon}>
        <svg width={25} height={24}>
          <use href={`${sprite}#slavica-icon`} />
        </svg>
        Personaliziraj
      </div>
    </Button>
  );
};
