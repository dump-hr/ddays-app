import clsx from 'clsx';

import c from './SectionBreaker.module.scss';

const color = {
  dark: '#000000',
  light: '#f5ede1',
  orange: '#ff482f',
  green: '#065852',
};

type SectionBreakerProps = {
  fg: keyof typeof color;
  bg?: keyof typeof color;
  className?: string;
};

export const SectionBreaker: React.FC<SectionBreakerProps> = ({
  fg,
  bg,
  className,
}) => {
  return (
    <div
      className={clsx(c.container, className, { [c.noise]: !!bg })}
      style={{ backgroundColor: bg ? color[bg] : undefined }}>
      <div className={c.fg} style={{ backgroundColor: color[fg] }} />
    </div>
  );
};
