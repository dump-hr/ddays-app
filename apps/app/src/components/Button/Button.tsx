import c from './Button.module.scss';
import clsx from 'clsx';
import starIcon from '../../assets/icons/star.svg';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'orange' | 'black' | 'beige';
  points?: number;
  icon?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  className,
  icon,
  points,
  ...handlers
}) => {
  if (points) {
    return (
      <button
        className={clsx(c.button, c.starButton, className, {
          [c.orange]: variant === 'orange',
          [c.black]: variant === 'black',
          [c.beige]: variant === 'beige',
        })}
        {...handlers}>
        <div className={c.content}>
          {children}
          <img className={c.star} src={starIcon} alt='' />
          {points}
        </div>
      </button>
    );
  }

  if (icon) {
    return (
      <button
        className={clsx(c.button, className, {
          [c.orange]: variant === 'orange',
          [c.black]: variant === 'black',
          [c.beige]: variant === 'beige',
        })}
        {...handlers}>
        <div className={c.content}>
          <img className={c.mr16} src={icon} alt='' />
          <p>{children}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      className={clsx(c.button, className, {
        [c.orange]: variant === 'orange',
        [c.black]: variant === 'black',
        [c.beige]: variant === 'beige',
      })}
      {...handlers}>
      <div className={c.content}>
        <p>{children}</p>
      </div>
    </button>
  );
};

export default Button;