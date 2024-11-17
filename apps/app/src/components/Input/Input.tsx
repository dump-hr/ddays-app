import c from './Input.module.scss';
import { dotMaker } from '../helpers/dotMaker';

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
};

export const Input = ({
  value,
  placeholder,
  onChange,
  error,
  type = 'text',
}: InputProps) => {
  const showLabel = error || value;
  const isActive = value && !error;

  return (
    <div className={c.container}>
      {showLabel && (
        <label className={`${c.label} ${error ? c.labelError : c.labelActive}`}>
          {placeholder}
        </label>
      )}

      <div className={c.inputWrapper}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={!showLabel ? placeholder : ''}
          className={`${c.input} ${error ? c.error : isActive ? c.active : ''}`}
        />

        {!value && <div className={c.dots}>{dotMaker()}</div>}
      </div>

      {error && <span className={c.errorText}>{error}</span>}
    </div>
  );
};
