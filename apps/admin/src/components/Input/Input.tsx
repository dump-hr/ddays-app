import c from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...handlers }) => {
  return <input {...handlers} className={c.input} />;
};

export default Input;
