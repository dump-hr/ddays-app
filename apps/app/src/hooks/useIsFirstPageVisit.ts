import { useEffect, useRef, useState } from 'react';

export const useIsFirstPageVisit = (localStorageName: string) => {
  const [firstPageVisit, setFirstPageVisit] = useState<boolean>(false);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;
    const storedValue = JSON.parse(
      localStorage.getItem(localStorageName) || 'null',
    );

    if (storedValue === null || storedValue === true) {
      localStorage.setItem(localStorageName, 'true');
      setFirstPageVisit(true);
      return;
    }

    localStorage.setItem(localStorageName, 'false');
    setFirstPageVisit(false);
  }, [localStorageName]);

  return { firstPageVisit, setFirstPageVisit };
};
