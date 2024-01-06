import clsx from 'clsx';

import c from './LayoutSpacing.module.scss';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const LayoutSpacing = ({ children, ...handlers }: Props) => {
  const classes = clsx(c.layoutSpacing, handlers.className);

  return (
    <div className={classes} {...handlers}>
      {children}
    </div>
  );
};

export default LayoutSpacing;
