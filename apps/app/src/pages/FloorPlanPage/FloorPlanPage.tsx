import FloorPlan from '@/components/FloorPlan';
import c from './FloorPlanPage.module.scss';
import ArrowsMinimize from '@/assets/icons/arrows-minimize.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useViewport from '@/hooks/useViewport';
import BoothPopup from './BoothPopup/BoothPopup';
import { Theme } from '@ddays-app/types';

const FloorPlanPage = () => {
  const navigate = useNavigate();
  const floorPlanContainerRef = useRef<HTMLDivElement>(null);
  const [upperShadowTop, setUpperShadowTop] = useState<number>(0);
  const [isBoothPopupOpen, setIsBoothPopupOpen] = useState(false);

  const { width } = useViewport();
  const DESKTOP_BREAKPOINT = 769;

  function handleBoothClick(boothString: string) {
    console.log(`Booth clicked: ${boothString}`);
    setIsBoothPopupOpen(true);
  }

  useEffect(() => {
    const updateUpperShadowPosition = () => {
      if (floorPlanContainerRef.current) {
        setUpperShadowTop(floorPlanContainerRef.current.offsetTop);
      }
    };

    updateUpperShadowPosition();

    window.addEventListener('resize', updateUpperShadowPosition);

    return () => {
      window.removeEventListener('resize', updateUpperShadowPosition);
    };
  }, []);

  return (
    <>
      {isBoothPopupOpen && (
        <BoothPopup
          isOpen={isBoothPopupOpen}
          closePopup={() => setIsBoothPopupOpen(false)}
          companyInfo={{
            name: 'Profico',
            logoUrl: 'https://example.com/logo.png',
            interests: [
              { id: 1, name: 'Interest 1', theme: Theme.DEV },
              { id: 2, name: 'Interest 2', theme: Theme.DEV },
              { id: 3, name: 'Interest 3', theme: Theme.DEV },
              { id: 4, name: 'Interest 4', theme: Theme.DEV },
              { id: 5, name: 'Interest 5', theme: Theme.DEV },
              { id: 6, name: 'Interest 6', theme: Theme.DEV },
              { id: 7, name: 'Interest 7', theme: Theme.DEV },
              { id: 8, name: 'Interest 8', theme: Theme.DEV },
              { id: 9, name: 'Interest 9', theme: Theme.DEV },
              { id: 10, name: 'Interest 10', theme: Theme.DEV },
            ],
          }}
        />
      )}
      <div className={c.page}>
        <div className={c.titleAndLegend}>
          <img
            src={ArrowsMinimize}
            className={c.minimize}
            onClick={() => navigate(-1)}
          />
          <h3 className={c.title}>Izložbeni prostor</h3>
          <div className={c.legendContainer}>
            <div className={c.legendItem}>
              <div className={c.legendMarker} />
              <p className={c.legendText}>Neposjećeno</p>
            </div>
            <div className={c.legendItem}>
              <div className={c.legendMarker} />
              <p className={c.legendText}>Posjećeno</p>
            </div>
          </div>
        </div>

        <div className={c.upperShadow} style={{ top: `${upperShadowTop}px` }} />

        {width < DESKTOP_BREAKPOINT && (
          <div className={c.floorPlanContainer} ref={floorPlanContainerRef}>
            <FloorPlan onBoothClick={handleBoothClick} />
          </div>
        )}

        {width >= DESKTOP_BREAKPOINT && (
          <div className={c.floorPlanContainerDesktop}>
            <FloorPlan onBoothClick={handleBoothClick} />
          </div>
        )}

        <div className={c.lowerShadow} />
      </div>
    </>
  );
};

export default FloorPlanPage;
