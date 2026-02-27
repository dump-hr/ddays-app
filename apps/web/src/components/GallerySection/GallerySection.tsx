import { DISPLAY, YEAR } from '@ddays-app/types';
import { useLenis } from '@studio-freight/react-lenis';
import filmFrameBorder from 'assets/images/film-frame-border.png';
import filmFrameOverlay from 'assets/images/film-frame-overlay.png';
import filmSamplePhoto from 'assets/images/film-sample-photo.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

import c from './GallerySection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const FILM_TEXT = `DUMP DAYS X  /  ${DISPLAY.HEADER_DAY_START_NUM}— 29.05.${YEAR}.`;

const PHOTOS = [
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
  filmSamplePhoto,
];

const PHOTOS_PER_SEGMENT = 3;

const FilmSegment = ({ photos }: { photos: string[] }) => (
  <div className={c.segment}>
    <div className={c.photosRow}>
      {photos.map((photo, i) => (
        <div key={i} className={c.photoFrame}>
          <img src={photo} alt='' className={c.photo} />
        </div>
      ))}
    </div>
    <img src={filmFrameBorder} alt='' className={c.frameBorder} />
    <img src={filmFrameOverlay} alt='' className={c.frameOverlay} />
    <p className={c.filmText}>{FILM_TEXT}</p>
  </div>
);

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<ReturnType<typeof useLenis> | null>(null);

  const lenis = useLenis();
  lenisRef.current = lenis;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!filmRef.current || !sectionRef.current) return;

      gsap.set(filmRef.current, { y: '100vh' });

      const tl = gsap.timeline({ paused: true });
      tl.to(filmRef.current, {
        y: 0,
        duration: 1,
        ease: 'none',
      });

      let completed = false;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!completed) {
            tl.progress(self.progress);
          }
        },
        onLeave: () => {
          completed = true;
          tl.progress(1);
        },
        onEnter: (self) => {
          if (completed) {
            const lenisInstance = lenisRef.current;
            if (lenisInstance) lenisInstance.stop();
            window.scrollTo(0, self.end + 1);
            if (lenisInstance) lenisInstance.start();
          }
        },
        onEnterBack: (self) => {
          if (completed) {
            const lenisInstance = lenisRef.current;
            if (lenisInstance) lenisInstance.stop();
            window.scrollTo(0, self.start - 1);
            if (lenisInstance) lenisInstance.start();
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const segments: string[][] = [];
  for (let i = 0; i < PHOTOS.length; i += PHOTOS_PER_SEGMENT) {
    segments.push(PHOTOS.slice(i, i + PHOTOS_PER_SEGMENT));
  }

  const onClickHandler = () => {
    window.open(
      'https://www.flickr.com/photos/143904306@N07/albums/',
      '_blank',
    );
  };

  return (
    <section
      ref={sectionRef}
      className={c.gallerySection}
      onClick={onClickHandler}>
      <div className={c.content}>
        <p className={c.subtitle}>Throwback na prošlogodišnja izdanja Daysa</p>
        <h3 className={c.title}>Galerija</h3>
      </div>
      <div ref={filmRef} className={c.filmWrapper}>
        <div className={c.track}>
          {segments.map((photos, i) => (
            <FilmSegment key={i} photos={photos} />
          ))}
          {segments.map((photos, i) => (
            <FilmSegment key={`dup-${i}`} photos={photos} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
