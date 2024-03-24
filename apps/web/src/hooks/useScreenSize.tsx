import { useEffect, useState } from 'react';

export const useScreenSize = (mobileBreakpoint: number) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < mobileBreakpoint,
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return { screenWidth, screenHeight, isMobile };
};
