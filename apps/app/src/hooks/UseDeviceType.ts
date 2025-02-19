import { useState, useEffect } from 'react';

enum DeviceType {
  SMALL_MOBILE = 'small-mobile',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

type UseDeviceReturn = {
  isMobile: boolean;
  isSmallMobile: boolean;
};

type UseDeviceProps = {
  mobileBreakpoint?: number;
  smallMobileBreakpoint?: number;
};

export const useDeviceType = ({
  mobileBreakpoint = 769,
  smallMobileBreakpoint = 370,
}: UseDeviceProps): UseDeviceReturn => {
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.DESKTOP);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDeviceType = () => {
      if (window.innerWidth < smallMobileBreakpoint) {
        setDeviceType(DeviceType.SMALL_MOBILE);
      } else if (window.innerWidth < mobileBreakpoint) {
        setDeviceType(DeviceType.MOBILE);
      } else {
        setDeviceType(DeviceType.DESKTOP);
      }
    };

    checkDeviceType();

    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, [mobileBreakpoint, smallMobileBreakpoint]);

  return {
    isMobile: deviceType === DeviceType.MOBILE,
    isSmallMobile: deviceType === DeviceType.SMALL_MOBILE,
  };
};
