import { DISPLAY } from '@ddays-app/types';
import duckWithBg from 'assets/images/duck-with-orange-background.png';
import { useEffect, useRef, useState } from 'react';

import c from './HeroSection.module.scss';

const TYPING_WORDS = [
  'DIGITALACA',
  'MARKETINGAŠA',
  'PROGRAMERA',
  'DIZAJNERA',
  'PODUZETNIKA',
];

const TYPING_SPEED = 150;
const DELETING_SPEED = 60;
const PAUSE_AFTER_TYPING = 500;
const PAUSE_AFTER_DELETING = 200;

const useTypingAnimation = (words: string[]) => {
  const [displayedText, setDisplayedText] = useState('');
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const tick = () => {
      const currentWord = words[wordIndexRef.current];
      const isDeleting = isDeletingRef.current;

      if (!isDeleting) {
        charIndexRef.current++;
        setDisplayedText(currentWord.slice(0, charIndexRef.current));

        if (charIndexRef.current === currentWord.length) {
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, PAUSE_AFTER_TYPING);
          return;
        }
        timeoutRef.current = setTimeout(tick, TYPING_SPEED);
      } else {
        charIndexRef.current--;
        setDisplayedText(currentWord.slice(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          timeoutRef.current = setTimeout(() => {
            tick();
          }, PAUSE_AFTER_DELETING);
          return;
        }
        timeoutRef.current = setTimeout(tick, DELETING_SPEED);
      }
    };

    tick();
    return () => clearTimeout(timeoutRef.current);
  }, [words]);

  return displayedText;
};

export const HeroSection = () => {
  const typedWord = useTypingAnimation(TYPING_WORDS);

  return (
    <section className={c.heroSection}>
      <div className={c.videoHero}>
        <div className={c.overlay} />
        <div className={c.heroContent}>
          <span className={c.subtitle}>// DUMP DAYS X</span>
          <span className={c.titleLine}>KONFERENCIJA</span>
          <span className={c.titleLine}>
            ZA
            <span className={c.slavicaInline}>
              <img src={duckWithBg} alt='' className={c.slavicaDuck} />
            </span>
            NOVU
          </span>
          <span className={c.titleLine}>GENERACIJU</span>
          <div className={c.lastRow}>
            <span className={c.dateLocation}>
              {`${DISPLAY.TEMP_HEADER_DAYS}\n// SPLIT, FESB`}
            </span>
            <span className={c.titleLine}>
              {typedWord}
              <span className={c.cursor}>_</span>
            </span>
          </div>
          <div className={c.ctaDivider} />
          <a href='https://days.dump.hr/app/login' className={c.ctaButton}>
            REGISTRIRAJ SE
          </a>
        </div>
      </div>
    </section>
  );
};
