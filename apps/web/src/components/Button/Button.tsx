import clsx from 'clsx';

import c from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...handlers }: ButtonProps) => {
  const classes = clsx(className, c.button);
  return (
    <button className={classes} {...handlers}>
      {children}
    </button>
  );
};

export default Button;
