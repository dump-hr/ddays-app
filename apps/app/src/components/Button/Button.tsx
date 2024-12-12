import c from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'orange' | 'black' | 'beige';
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  active,
  ...handlers
}) => {
  return (
    <button
      className={clsx(c.button, {
        [c.orange]: variant === 'orange',
        [c.black]: variant === 'black',
        [c.beige]: variant === 'beige',
        [c.orangeActive]: active && variant === 'orange',
        [c.blackActive]: active && variant === 'black',
        [c.beigeActive]: active && variant === 'beige',
      })}
      {...handlers}>
      {children}
    </button>
  );
};

export default Button;
