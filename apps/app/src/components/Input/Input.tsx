import c from './Input.module.scss';
import clsx from 'clsx';

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
} & React.HTMLProps<HTMLInputElement>;

export const Input = ({
  value,
  placeholder,
  onChange,
  error,
  type = 'text',
  ...props
}: InputProps) => {
  const showLabel = error || value;
  const isActive = value && !error;
  return (
    <div className={c.container} style={props.style}>
      {showLabel && (
        <label
          className={clsx(c.label, {
            [c.labelError]: error,
            [c.labelActive]: !error,
          })}>
          {placeholder}
        </label>
      )}

      <div className={c.inputWrapper}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={!showLabel ? placeholder : ''}
          className={clsx(
            c.input,
            error && c.error,
            isActive && c.active,
            props.className,
          )}
          {...props}
        />

        {!value && !error && <div className={c.dots}></div>}
      </div>

      {error && (
        <span className={clsx(c.errorText, { visible: !!error })}>{error}</span>
      )}
    </div>
  );
};
