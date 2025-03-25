import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './InterestsPage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';
import { InterestProgressBar } from '../../components/InterestProgressBar';
import Button from '../../components/Button';
import Pencil from '@/assets/icons/pencil-icon.svg';
import { InterestCardsSection } from '../../components/InterestCardsSection/InterestCardsSection';
import { useDeviceType } from '../../hooks/UseDeviceType';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import CloseIcon from './../../assets/icons/remove-icon-black.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InterestsPage = () => {
  const [editIsOpen, setEditIsOpen] = useState(false);
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
    setEditIsOpen(true);
  };

  const handleCloseIconClick = () => {
    setEditIsOpen(false);
  };

  const handleSaveInterests = () => {
    setUserSelectedInterests(tempSelectedInterests);
    setEditIsOpen(false);
  };
  return (
    <>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Interesi</span> <br />
            Marija Gudelj
          </p>

          <AvatarPointsCircle points={900} avatar={TempAvatar} />
        </div>

        <div className={c.statsWrapper}>
          <InterestProgressBar label='Programiranje' percentage={50} />
          <InterestProgressBar label='Marketing' percentage={72} />
          <InterestProgressBar label='Product' percentage={22} />
          <InterestProgressBar label='Product' percentage={22} />
        </div>
      </header>

      <main className={c.main}>
        <div className={c.wrapper}>
          {isMobile ? (
            <div className={c.wrapperHeader}>
              <img
                src={ArrowLeft}
                alt='return icon'
                onClick={() => navigate('/app/profile')}
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

      {editIsOpen && (
        <div className={c.interestsForUpdate}>
          <div className={c.updateHeader}>
            <h2>Uredi interese</h2>
            <img
              src={CloseIcon}
              alt='close icon'
              onClick={handleCloseIconClick}
            />
          </div>

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
      )}
    </>
  );
};
