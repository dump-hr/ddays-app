import { useEffect, useState } from 'react';

const useDetectKeyboardOpen = (
  minKeyboardHeight = 300,
  defaultValue = false,
) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);

  useEffect(() => {
    const listener = () => {
      const viewportHeight =
        window.visualViewport && window.visualViewport.height !== null
          ? window.visualViewport.height
          : window.innerHeight;

      const newState =
        window.screen.height - minKeyboardHeight > viewportHeight;
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState);
      }
    };

    if (typeof window.visualViewport !== 'undefined') {
      window.visualViewport?.addEventListener('resize', listener);
    } else {
      window.addEventListener('resize', listener);
    }

    return () => {
      if (typeof window.visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', listener);
      } else {
        window.removeEventListener('resize', listener);
      }
    };
  }, [isKeyboardOpen, minKeyboardHeight]);

  return isKeyboardOpen;
};

export default useDetectKeyboardOpen;
