import c from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...handlers }) => {
  return (
    <button className={c.button} {...handlers}>
      {children}
    </button>
  );
};

export default Button;
