import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowLeftWhite from '@/assets/icons/arrow-left-white.svg';
import c from './AvatarsPage.module.scss';
import Button from '@/components/Button';
import { AvatarNavigationBar } from '@/components/AvatarNavigationBar';
import { DuckItems, Option } from '@/types/avatar/avatar';
import { AvatarOptionsGrid } from '@/components/AvatarOptionsGrid';
import { AvatarPreview } from '@/components/AvatarPreview';
import { DUCK_OPTIONS } from '@/constants';
import { AvatarPreviewRef } from '@/components/AvatarPreview/AvatarPreview';
import {
  useCreateTemporaryAvatar,
  useUploadAvatar,
} from '@/api/avatar/useUploadAvatar';
import { UserWithAvatarDto } from '@ddays-app/types';

export const AvatarsPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl;
  const isRegistrationFlow = returnUrl?.includes('/register');
  const [navigationItem, setNavigationItem] = useState<DuckItems>(
    DuckItems.COLORS,
  );
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<DuckItems, Option>
  >({
    [DuckItems.COLORS]: DUCK_OPTIONS[DuckItems.COLORS][0],
    [DuckItems.FACE]: DUCK_OPTIONS[DuckItems.FACE][7],
    [DuckItems.ACCESSORIES]: DUCK_OPTIONS[DuckItems.ACCESSORIES][7],
    [DuckItems.BODY]: DUCK_OPTIONS[DuckItems.BODY][7],
  });

  const avatarPreviewRef = useRef<AvatarPreviewRef>(null);

  const handleSuccess = (profilePhotoUrl: string | undefined) => {
    if (!profilePhotoUrl) {
      console.error('No profile photo URL received');
      return;
    }

    if (returnUrl) {
      navigate(returnUrl, {
        state: { profilePhotoUrl },
      });
    } else {
      navigate(-1);
    }
  };

  const { mutate: uploadAvatar, isLoading: isSaving } = useUploadAvatar(
    (data: UserWithAvatarDto) => handleSuccess(data.profilePhotoUrl),
  );

  const { mutate: createTempAvatar, isLoading: isCreatingTemp } =
    useCreateTemporaryAvatar((data: { profilePhotoUrl: string }) =>
      handleSuccess(data.profilePhotoUrl),
    );

  useEffect(() => {
    setCurrentOptions(DUCK_OPTIONS[navigationItem]);
  }, [navigationItem]);

  const handleSelectOption = (option: Option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [navigationItem]: option,
    }));
  };

  const handleSaveAvatar = async () => {
    if (!avatarPreviewRef.current) return;

    try {
      const blob = await avatarPreviewRef.current.captureAvatar();

      if (!blob) {
        return;
      }

      if (isRegistrationFlow) {
        createTempAvatar(blob);
      } else {
        const options = {
          colors: selectedOptions[DuckItems.COLORS].value,
          face: selectedOptions[DuckItems.FACE].value,
          accessories: selectedOptions[DuckItems.ACCESSORIES].value,
          body: selectedOptions[DuckItems.BODY].value,
        };
        uploadAvatar({ blob, options });
      }
    } catch (error) {
      console.error('Error generating avatar:', error);
    }
  };

  useEffect(() => {
    setCurrentOptions(DUCK_OPTIONS[navigationItem]);
  }, [navigationItem]);

  return (
    <div className={c.container}>
      <BackButton />
      <AvatarPreview
        elements={selectedOptions}
        selectedOption={navigationItem}
        ref={avatarPreviewRef}
      />
      <div className={c.bottomContainer}>
        <div className={c.bottomWrapper}>
          <AvatarNavigationBar
            menuOption={navigationItem}
            setMenuOption={setNavigationItem}
          />
          <AvatarOptionsGrid
            options={currentOptions}
            onSelectOptions={handleSelectOption}
            selectedOption={selectedOptions[navigationItem]}
          />
          <Button
            variant='orange'
            onClick={handleSaveAvatar}
            disabled={isSaving || isCreatingTemp}>
            Spremi
          </Button>
        </div>
      </div>
    </div>
  );
};

const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <button className={c.backButton} onClick={() => navigate(-1)}>
      <img src={ArrowLeftWhite} alt='' />
    </button>
  );
};
