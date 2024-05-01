import { useEffect, useState } from 'react';

export const useScreenSize = (
  mobileBreakpoint: number,
  smallScreenBreakpoint = 1024,
) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < mobileBreakpoint,
  );
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= smallScreenBreakpoint &&
      window.innerWidth > mobileBreakpoint,
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      setIsMobile(window.innerWidth < mobileBreakpoint);
      setIsSmallScreen(window.innerWidth < smallScreenBreakpoint);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return { screenWidth, screenHeight, isMobile, isSmallScreen };
};
