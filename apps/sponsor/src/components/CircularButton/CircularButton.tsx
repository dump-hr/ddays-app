import clsx from 'clsx';

import c from './CircularButton.module.scss';

type CircularButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CircularButton = ({
  children,
  className,
  ...handlers
}: CircularButtonProps) => {
  const classes = clsx(c.circularButton, className);
  return (
    <button className={classes} {...handlers}>
      {children}
    </button>
  );
};

export default CircularButton;
