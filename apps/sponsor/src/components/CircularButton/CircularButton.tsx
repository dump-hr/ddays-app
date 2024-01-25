import clsx from 'clsx';

import c from './CircularButton.module.scss';

type CircularButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CircularButton = ({
  children,
  className,
  ...handlers
}: CircularButtonProps) => {
  return (
    <button className={clsx(c.circularButton, className)} {...handlers}>
      {children}
    </button>
  );
};
