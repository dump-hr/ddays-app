import clsx from 'clsx';

import c from './LayoutSpacing.module.scss';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutSpacing = ({ children, className, ...handlers }: Props) => {
  const classes = clsx(c.layoutSpacing, className);

  return (
    <div className={classes} {...handlers}>
      {children}
    </div>
  );
};
