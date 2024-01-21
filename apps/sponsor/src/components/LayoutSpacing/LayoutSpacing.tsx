import clsx from 'clsx';

import c from './LayoutSpacing.module.scss';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutSpacing = ({ children, className, ...handlers }: Props) => {
  return (
    <div className={clsx(c.layoutSpacing, className)} {...handlers}>
      {children}
    </div>
  );
};
