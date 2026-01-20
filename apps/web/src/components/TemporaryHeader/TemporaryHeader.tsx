import { DISPLAY } from '@ddays-app/types';
import clsx from 'clsx';
import Button from 'components/Button';
import { useEffect, useState } from 'react';

import c from './TemporaryHeader.module.scss';

const TemporaryHeader = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(true);

  // TODO: refactor this to only use mutation observer

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);

        const DuckieSection = document.getElementById('konferencija');
        if (DuckieSection) {
          const { top } = DuckieSection.getBoundingClientRect();

          if (window.scrollY === 0) {
            setIsStickyVisible(true);
          } else {
            setIsStickyVisible(top <= 0);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const classes = clsx({
    [c.header]: true,
    [c.blend]: scrollY > 0.85 * window.innerHeight,
    [c.scrolled]: scrollY > 32,
    [c.hidden]: !isStickyVisible,
  });

  function openArchivedWeb() {
    window.open(`https://days.dump.hr/app/`, '_blank');
  }

  return (
    <header className={classes}>
      <p className={c.text}>
        SPLIT <span className={c.separator}>//</span> FESB <br />{' '}
        {DISPLAY.HEADER_DAY_START_NUM}
        <span className={c.separator}>—</span> {DISPLAY.HEADER_DAY_END_FULL}
      </p>
      <p className={c.text}>
        BESPLATNA KONFERENCIJA <br />
        ZA NOVU GENERACIJU
      </p>
      <Button onClick={openArchivedWeb}> DUMP DAYS WEB APP</Button>
    </header>
  );
};

export default TemporaryHeader;
