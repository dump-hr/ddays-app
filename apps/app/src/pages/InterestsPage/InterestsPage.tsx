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

export const InterestsPage = () => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const { isMobile } = useDeviceType({});

  const handleEditYourInterestsClick = (isOpen: boolean) => {
    setEditIsOpen(!isOpen);
  };

  const handleCloseIconClick = () => {
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
              <img src={ArrowLeft} alt='return icon' />
              <h2>INTERESI</h2>
              <div className={c.editIcon}>
                <img src={Pencil} alt='edit icon' />
              </div>
            </div>
          ) : (
            <Button
              variant='beige'
              icon={Pencil}
              onClick={() => handleEditYourInterestsClick(editIsOpen)}>
              Uredi svoje interese
            </Button>
          )}

          <section className={c.interests}>
            <InterestCardsSection />
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

          <InterestCardsSection forUpdate />

          <div className={c.saveBtnWrapper}>
            <Button variant='black'>Spremi</Button>
          </div>
        </div>
      )}
    </>
  );
};
