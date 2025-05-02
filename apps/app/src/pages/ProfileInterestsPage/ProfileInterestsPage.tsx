import c from './ProfileInterestsPage.module.scss';
import Button from '../../components/Button';
import Pencil from '@/assets/icons/pencil-icon.svg';
import { InterestCardsSection } from '../../components/InterestCardsSection/InterestCardsSection';
import { useDeviceType } from '../../hooks/UseDeviceType';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../../components/ProfileHeader';
import { useUserSelectedInterests } from '@/api/interests/useUserSelectedInterests';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { InterestsForUpdatePopup } from './popups/InterestsForUpdatePopup';

export const ProfileInterestsPage = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const { data: user } = useLoggedInUser();
  const { data: userInterests } = useUserSelectedInterests(user?.id || 0);

  const [allowEdit, setAllowEdit] = useState(false);

  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();

  const handleEditYourInterestsClick = () => {
    setPopupIsOpen(true);
  };

  return (
    <>
      <InterestsForUpdatePopup
        isOpen={popupIsOpen}
        setIsOpen={setPopupIsOpen}
        defaultInterests={userInterests || []}
      />

      <div className={c.container}>
        <ProfileHeader
          pageHeader='Interesi'
          userNameAndSurname='Marija Gudelj'
        />
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
            <button onClick={() => setAllowEdit(!allowEdit)}>toggle</button>
            <button
              onClick={() => {
                console.log(userInterests);
              }}>
              log everything
            </button>
            <section className={c.interests}>
              <InterestCardsSection
                interests={userInterests || []}
                selectedInterests={userInterests || []}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};
