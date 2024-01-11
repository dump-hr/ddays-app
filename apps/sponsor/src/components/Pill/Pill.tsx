import clsx from 'clsx';

import c from './Pill.module.scss';

type PillProps = {
  text: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Pill = ({ text, className, ...handlers }: PillProps) => {
  const classes = clsx(c.pill, className);
  return (
    <div className={classes} {...handlers}>
      {text}
    </div>
  );
};

export default Pill;
