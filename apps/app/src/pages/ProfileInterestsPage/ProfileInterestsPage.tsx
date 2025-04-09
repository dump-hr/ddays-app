import c from './ProfileInterestsPage.module.scss';
import Button from '../../components/Button';
import Pencil from '@/assets/icons/pencil-icon.svg';
import { InterestCardsSection } from '../../components/InterestCardsSection/InterestCardsSection';
import { useDeviceType } from '../../hooks/UseDeviceType';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../../components/ProfileHeader';
import PopupLayout from '../../layout/PopupLayout/PopupLayout';

export const ProfileInterestsPage = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [userSelectedInterests, setUserSelectedInterests] = useState<string[]>([
    'Web development',
    'Java',
    'C#',
    'Kampanje',
    'UX dizajn',
    'UI',
    'Figma',
    'Product Owner',
  ]);
  const [tempSelectedInterests, setTempSelectedInterests] = useState(
    userSelectedInterests,
  );
  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();

  const handleEditYourInterestsClick = () => {
    setTempSelectedInterests(userSelectedInterests);
    setPopupIsOpen(true);
  };

  const handleSaveInterests = () => {
    setUserSelectedInterests(tempSelectedInterests);
    setPopupIsOpen(false);
  };
  return (
    <div className={c.container}>
      <ProfileHeader pageHeader='Interesi' userNameAndSurname='Marija Gudelj' />
      <main className={c.main}>
        <div className={c.wrapper}>
          {isMobile ? (
            <div className={c.wrapperHeader}>
              <img
                src={ArrowLeft}
                alt='return icon'
                onClick={() => navigate('/app/profile')}
                className={c.returnIcon}
              />
              <h2>INTERESI</h2>
              <div className={c.editIcon}>
                <img
                  src={Pencil}
                  alt='edit icon'
                  onClick={handleEditYourInterestsClick}
                />
              </div>
            </div>
          ) : (
            <Button
              variant='beige'
              icon={Pencil}
              onClick={handleEditYourInterestsClick}>
              Uredi svoje interese
            </Button>
          )}

          <section className={c.interests}>
            <InterestCardsSection
              userSelectedInterests={userSelectedInterests}
              setUserSelectedInterests={setUserSelectedInterests}
            />
          </section>
        </div>
      </main>

      <PopupLayout
        variant='light'
        headerTitleComponent='Uredi interese'
        closePopup={() => setPopupIsOpen(false)}
        isOpen={popupIsOpen}
        desktopStyle={'normal'}>
        <div className={c.interestsForUpdate}>
          <p>
            Odaberi svoje interese, a mi ćemo ti preporučiti poslodavce,
            predavanja i grupe za fly talk koje bi ti se mogle svidjeti.
          </p>

          <InterestCardsSection
            forUpdate
            userSelectedInterests={tempSelectedInterests}
            setUserSelectedInterests={setTempSelectedInterests}
          />

          <div className={c.saveBtnWrapper}>
            <Button variant='black' onClick={handleSaveInterests}>
              Spremi
            </Button>
          </div>
        </div>
      </PopupLayout>
    </div>
  );
};
