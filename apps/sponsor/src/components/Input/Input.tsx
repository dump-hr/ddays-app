import clsx from 'clsx';
import c from './Input.module.scss';

type InputProps = {
  value: string;
  label: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  textArea?: boolean;
  maxLength?: number;
};

export const Input = ({
  value,
  label,
  disabled = false,
  onChange = () => {},
  className,
  textArea = false,
  maxLength,
}: InputProps) => {
  if (textArea) {
    return (
      <textarea
        value={value}
        placeholder={label}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(c.input, className)}
        maxLength={maxLength}
      />
    );
  }

  return (
    <input
      value={value}
      placeholder={label}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(c.input, className)}
      maxLength={maxLength}
    />
  );
};
