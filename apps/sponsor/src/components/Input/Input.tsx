import c from './Input.module.scss';

type InputProps = {
  value: string;
  label: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export const Input = ({
  value,
  label,
  disabled = false,
  onChange = () => {},
}: InputProps) => {
  return (
    <input
      value={value}
      placeholder={label}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={c.input}
    />
  );
};
