import clsx from 'clsx';
import React from 'react';

import c from './WhiteButton.module.scss';

type WhiteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

const WhiteButton: React.FC<WhiteButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  const classes = clsx(
    c.button,
    {
      [c.primary]: variant === 'primary',
    },
    className,
  );

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export default WhiteButton;
