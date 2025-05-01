import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeftWhite from '@/assets/icons/arrow-left-white.svg';
import c from './AvatarsPage.module.scss';
import Button from '@/components/Button';
import { AvatarNavigationBar } from '@/components/AvatarNavigationBar';
import { DuckItems, Option } from '@/types/avatar/avatar';
import { AvatarOptionsGrid } from '@/components/AvatarOptionsGrid';
import { AvatarPreview } from '@/components/AvatarPreview';
import { DUCK_OPTIONS } from '@/constants';
import { AvatarPreviewRef } from '@/components/AvatarPreview/AvatarPreview';
import toast from 'react-hot-toast';
import { RouteNames } from '@/router/routes';

export const AvatarsPage: FC = () => {
  const navigate = useNavigate();
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
  const [isSaving, setIsSaving] = useState(false);

  const avatarPreviewRef = useRef<AvatarPreviewRef>(null);

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
    console.log('Saving avatar...');
    if (!avatarPreviewRef.current) return;

    try {
      setIsSaving(true);
      const blob = await avatarPreviewRef.current.captureAvatar();

      if (!blob) {
        toast.error('Greška prilikom generiranja avatara');
        return;
      }
      const options = {
        colors: selectedOptions[DuckItems.COLORS].value,
        face: selectedOptions[DuckItems.FACE].value,
        accessories: selectedOptions[DuckItems.ACCESSORIES].value,
        body: selectedOptions[DuckItems.BODY].value,
      };

      // TODO update avatar and save avatar maybe
      //const imageUrl = await uploadAvatar(blob, options);

      toast.success('Avatar saved successfully!');

      navigate(RouteNames.PROFILE);
    } catch (error) {
      console.error('Error saving avatar:', error);
      toast.error('Greška prilikom spremanja avatara. Pokušajte ponovno.');
    } finally {
      setIsSaving(false);
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
            disabled={isSaving}>
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
