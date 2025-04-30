import clsx from 'clsx';

import FilmFrameImage from '../../assets/film-frame.webp';
import c from './FilmFrame.module.scss';

type FilmFrameProps = {
  imageSrc: string | undefined;
  width: number;
  height: number;
  isFiltered?: boolean;
};

const FilmFrame: React.FC<FilmFrameProps> = ({
  imageSrc,
  width,
  height,
  isFiltered = false,
}) => {
  return (
    <div style={{ height: height, width: width }} className={c.frameWrapper}>
      <img className={c.frame} src={FilmFrameImage} alt='' />
      <img
        className={clsx(c.frameImage, { [c.frameImageFiltered]: isFiltered })}
        src={imageSrc}
      />
    </div>
  );
};

export default FilmFrame;
