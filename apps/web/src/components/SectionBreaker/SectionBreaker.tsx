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
  flipped?: boolean;
};

export const SectionBreaker: React.FC<SectionBreakerProps> = ({
  fg,
  bg,
  className,
  flipped = false,
}) => {
  return (
    <div
      className={clsx(c.container, className, {
        [c.noise]: !!bg,
        [c.flipped]: flipped,
      })}
      style={{ backgroundColor: bg ? color[bg] : undefined }}>
      <div className={c.fg} style={{ backgroundColor: color[fg] }} />
    </div>
  );
};
