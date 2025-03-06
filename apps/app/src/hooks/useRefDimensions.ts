import { useState, useEffect, RefObject } from 'react';

const useRefDimensions = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });

  useEffect(() => {
    if (!ref.current) return;

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width: Math.round(width), height: Math.round(height) });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(() => updateDimensions());
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
};

export default useRefDimensions;
