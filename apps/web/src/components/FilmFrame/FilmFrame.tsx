import FilmFrameSvg from '../../assets/FilmFrame.svg';
import c from './FilmFrame.module.scss';

type FilmFrameProps = {
  imageSrc: string | undefined;
  width: number;
  height: number;
};

const FilmFrame: React.FC<FilmFrameProps> = ({ imageSrc, width, height }) => {
  return (
    <div style={{ height: height, width: width }} className={c.frameWrapper}>
      <img className={c.frame} src={FilmFrameSvg} alt='' />
      <img className={c.frameImage} src={imageSrc} />
    </div>
  );
};

export default FilmFrame;
