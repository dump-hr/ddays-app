import { Header } from '../../components/Header';
import c from './Home.module.scss';
import TopCompaniesSection from '../../components/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';
import { useState } from 'react';
import PointModifierPopup from './popups/PointModifierPopup';
import NewLevelPopup from './popups/NewLevelPopup';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import { getLevelFromPoints } from '@/helpers/getLevelFromPoints';

const HomePage = () => {
  const { data: user } = useLoggedInUser();

  function handleSuccessfulCodeSubmit(points: number) {
    setIsCodePopupOpen(false);

    if (!user) return;

    const oldLevel = getLevelFromPoints(user.points).level;
    const newLevel = getLevelFromPoints(user.points + points).level;

    if (oldLevel !== newLevel) {
      setLevel(newLevel);
      setIsNewLevelPopupOpen(true);
      return;
    }

    if (points > 0) {
      setPoints(points);
      setIsPointModifierPopupOpen(true);
    }
  }

  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPointModifierPopupOpen, setIsPointModifierPopupOpen] =
    useState(false);
  const [isNewLevelPopupOpen, setIsNewLevelPopupOpen] = useState(false);

  return (
    <div className={c.page}>
      <header className={c.header}>
        <Header openCodePopup={() => setIsCodePopupOpen(true)} />
      </header>
      <main className={c.main}>
        <EventsSection />
        <LocationSection />
        <TopCompaniesSection />

        <CodePopup
          isOpen={isCodePopupOpen}
          closePopup={() => setIsCodePopupOpen(false)}
          onSuccess={(points: number) => handleSuccessfulCodeSubmit(points)}
        />

        <PointModifierPopup
          points={points}
          isOpen={isPointModifierPopupOpen}
          closePopup={() => setIsPointModifierPopupOpen(false)}
        />

        <NewLevelPopup
          level={level}
          isOpen={isNewLevelPopupOpen}
          closePopup={() => setIsNewLevelPopupOpen(false)}
        />
      </main>
    </div>
  );
};

export default HomePage;
