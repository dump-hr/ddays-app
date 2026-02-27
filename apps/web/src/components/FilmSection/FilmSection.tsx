import { DISPLAY, YEAR } from '@ddays-app/types';
import filmFrameBorder from 'assets/images/film-frame-border.png';
import filmFrameOverlay from 'assets/images/film-frame-overlay.png';
import filmSamplePhoto from 'assets/images/film-sample-photo.png';

import c from './FilmSection.module.scss';

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

const FilmSection = () => {
  const segments: string[][] = [];
  for (let i = 0; i < PHOTOS.length; i += PHOTOS_PER_SEGMENT) {
    segments.push(PHOTOS.slice(i, i + PHOTOS_PER_SEGMENT));
  }

  return (
    <section className={c.filmSection}>
      <div className={c.track}>
        {segments.map((photos, i) => (
          <FilmSegment key={i} photos={photos} />
        ))}
        {segments.map((photos, i) => (
          <FilmSegment key={`dup-${i}`} photos={photos} />
        ))}
      </div>
    </section>
  );
};

export default FilmSection;
