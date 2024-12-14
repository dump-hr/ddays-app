import c from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'orange' | 'black' | 'beige';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  className,
  ...handlers
}) => {
  return (
    <button
      className={clsx(c.button, className, {
        [c.orange]: variant === 'orange',
        [c.black]: variant === 'black',
        [c.beige]: variant === 'beige',
      })}
      {...handlers}>
      {children}
    </button>
  );
};

export default Button;
