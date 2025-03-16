import { useState, useEffect } from 'react';
import { FlyTalksWelcome } from '../../components/FlyTalksWelcome';
import FlyTalksList from '../../components/FlyTalksList';

const FlyTalksPage = () => {
  const [firstFlyTalksVisit, setFirstFlyTalksVisit] = useState(false);

  useEffect(() => {
    const storedValue = JSON.parse(
      localStorage.getItem('firstFlyTalksVisit') || 'null',
    );

    if (storedValue === null || storedValue === true) {
      localStorage.setItem('firstFlyTalksVisit', 'true');
      setFirstFlyTalksVisit(true);
    } else {
      localStorage.setItem('firstFlyTalksVisit', 'false');
      setFirstFlyTalksVisit(false);
    }
  }, []);

  return (
    <>
      {firstFlyTalksVisit ? (
        <FlyTalksWelcome setFirstFlyTalksVisit={setFirstFlyTalksVisit} />
      ) : (
        <FlyTalksList />
      )}
    </>
  );
};

export default FlyTalksPage;
