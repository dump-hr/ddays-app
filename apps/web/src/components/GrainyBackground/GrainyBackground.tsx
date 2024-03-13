import c from './GrainyBackground.module.scss';

type GrainyBackgroundProps = {
  children: JSX.Element;
};

const GrainyBackground: React.FC<GrainyBackgroundProps> = ({ children }) => {
  return <div className={c.container}>{children}</div>;
};

export default GrainyBackground;
