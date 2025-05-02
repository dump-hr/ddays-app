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
import { InterestDto } from '@ddays-app/types';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

export const ProfileInterestsPage = () => {
  const [, setPopupIsOpen] = useState(false);
  const { data: user } = useLoggedInUser();
  const { data: interestsFromApi } = useUserSelectedInterests(user?.id || 0);

  const [tempSelectedInterests, setTempSelectedInterests] = useState<
    InterestDto[]
  >(interestsFromApi || []);

  const { isMobile } = useDeviceType({});
  const navigate = useNavigate();

  const handleEditYourInterestsClick = () => {
    setTempSelectedInterests(interestsFromApi || []);
    setPopupIsOpen(true);
  };

  /*
  const handleSaveInterests = () => {
    setPopupIsOpen(false);
  };
  */

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
              interests={interestsFromApi || []}
              userSelectedInterests={tempSelectedInterests}
              setUserSelectedInterests={() => {}}
            />
          </section>
        </div>
      </main>
    </div>
  );
};
