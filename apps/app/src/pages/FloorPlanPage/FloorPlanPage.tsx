import FloorPlan from '@/components/FloorPlan';
import c from './FloorPlanPage.module.scss';
import ArrowsMinimize from '@/assets/icons/arrows-minimize.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useViewport from '@/hooks/useViewport';

const FloorPlanPage = () => {
  const navigate = useNavigate();
  const floorPlanContainerRef = useRef<HTMLDivElement>(null);
  const [upperShadowTop, setUpperShadowTop] = useState<number>(0);

  const { width } = useViewport();
  const DESKTOP_BREAKPOINT = 769;

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
          <FloorPlan />
        </div>
      )}

      {width >= DESKTOP_BREAKPOINT && (
        <div className={c.floorPlanContainerDesktop}>
          <FloorPlan />
        </div>
      )}

      {/* This div is used to create a shadow effect at the bottom of the page */}

      <div className={c.lowerShadow} />
    </div>
  );
};

export default FloorPlanPage;
