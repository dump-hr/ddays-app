import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';

import { temporaryEditions } from '../../constants/temporary-editions';
import c from './TemporaryPastEditions.module.scss';

const TemporaryPastEditions = () => {
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const adjustFontSizes = useCallback(() => {
    titleRefs.current.forEach((titleEl) => {
      if (!titleEl) return;

      const container = titleEl.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const availableWidth = containerWidth;

      titleEl.style.fontSize = '100px';

      const textWidth = titleEl.scrollWidth;
      const scale = (availableWidth / textWidth) * 1.2;
      const newFontSize = Math.floor(100 * scale);

      titleEl.style.fontSize = `${newFontSize}px`;
    });
  }, []);

  useEffect(() => {
    adjustFontSizes();
    window.addEventListener('resize', adjustFontSizes);
    return () => window.removeEventListener('resize', adjustFontSizes);
  }, [adjustFontSizes]);

  const handleEditionClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className={c.PastEditions}>
      <h1>
        BACI OKO NA SVA <br /> IZDANJA<span> DAYSA</span>
      </h1>
      <div className={c.editionsContainer}>
        {temporaryEditions.map((edition, editionIndex) => (
          <div
            className={c.editionWrapper}
            key={edition.year}
            onClick={() => handleEditionClick(edition.link)}
            style={{ cursor: 'pointer' }}
          >
            {[1, 2, 3].map((_, index) => (
              <div
                className={clsx(
                  c.editionImageWrapper,
                  c[`backgroundImage${index + 1}`],
                )}
                key={index}>
                <img
                  src={edition.image}
                  alt={`DUMP DAYS ${edition.year}`}
                  className={c.editionImage}
                />
              </div>
            ))}
            <div className={clsx(c.editionImageWrapper, c.frontImage)}>
              <p
                className={c.editionTitle}
                ref={(el) => (titleRefs.current[editionIndex] = el)}>
                {edition.year}
              </p>
              <img
                src={edition.image}
                alt={`DUMP DAYS ${edition.year}`}
                className={c.editionImage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemporaryPastEditions;
