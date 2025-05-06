import { Header } from '../../components/Header';
import c from './Home.module.scss';
//import TopCompaniesSection from '../../components/TopCompaniesSection';
import EventsSection from './sections/EventsSection';
import LocationSection from '../../components/LocationSection';
import CodePopup from './popups/CodePopup/CodePopup';
import { useState } from 'react';

import { useLoggedInUser } from '@/api/auth/useLoggedInUser';

import AppliedCodeAchievementPopup from '@/components/AppliedCodeAchievementPopup';

const HomePage = () => {
  const { data: user } = useLoggedInUser();
  const [points, setPoints] = useState(0);

  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);

  const [
    isAppliedCodeAchievementPopupOpen,
    setIsAppliedCodeAchievementPopupOpen,
  ] = useState(false);

  function handleSuccessfulCodeSubmit(points: number) {
    setPoints(points);
    setIsCodePopupOpen(false);
    setIsAppliedCodeAchievementPopupOpen(true);
  }

  return (
    <div className={c.page}>
      <header className={c.header}>
        <Header openCodePopup={() => setIsCodePopupOpen(true)} />
      </header>
      <main className={c.main}>
        <EventsSection />
        <LocationSection />
        {/**
         <TopCompaniesSection />
         */}

        <CodePopup
          isOpen={isCodePopupOpen}
          closePopup={() => setIsCodePopupOpen(false)}
          onSuccess={(points: number) => handleSuccessfulCodeSubmit(points)}
        />

        <AppliedCodeAchievementPopup
          isOpen={isAppliedCodeAchievementPopupOpen}
          user={user}
          points={points}
        />
      </main>
    </div>
  );
};

export default HomePage;
