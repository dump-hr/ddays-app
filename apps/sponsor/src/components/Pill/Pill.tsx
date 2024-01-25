import clsx from 'clsx';

import c from './Pill.module.scss';

type PillProps = {
  text: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Pill = ({ text, className, ...handlers }: PillProps) => {
  return (
    <div className={clsx(c.pill, className)} {...handlers}>
      {text}
    </div>
  );
};
