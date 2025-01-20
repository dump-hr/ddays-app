import { useState, useEffect } from 'react';

enum DeviceType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

type UseDeviceReturn = {
  isMobile: boolean;
};

type UseDeviceProps = {
  breakpoint?: number;
};

export const useDeviceType = ({
  breakpoint = 769,
}: UseDeviceProps): UseDeviceReturn => {
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.DESKTOP);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDeviceType = () => {
      const type =
        window.innerWidth < breakpoint ? DeviceType.MOBILE : DeviceType.DESKTOP;
      setDeviceType(type);
    };

    checkDeviceType();

    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, [breakpoint]);

  return {
    isMobile: deviceType === DeviceType.MOBILE,
  };
};
