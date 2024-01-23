import clsx from 'clsx';

import c from './LayoutSpacing.module.scss';

type LayoutSpacingProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const LayoutSpacing: React.FC<LayoutSpacingProps> = ({
  children,
  className,
  ...handlers
}) => {
  return (
    <div className={clsx(c.layoutSpacing, className)} {...handlers}>
      {children}
    </div>
  );
};
