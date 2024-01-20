import { FormEvent } from 'react';

import c from './TextArea.module.scss';

type TextAreaProps = {
  limit: number;
  deviation: number;
  value: string;
  label: string;
  disabled?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
};

const TextArea = ({
  limit,
  deviation,
  value,
  label,
  disabled = false,
  rows = 6,
  onChange = () => {},
}: TextAreaProps) => {
  const lowerBound = limit - deviation;
  const upperBound = limit + deviation;

  const wc = value.match(/\S+/g)?.length || 0;
  const textTooShort = wc > 0 && wc < lowerBound;
  const textTooLong = wc > 0 && wc >= upperBound;

  const handleInputChange = (event: FormEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      const { value } = event.currentTarget;
      const valueWc = value.match(/\S+/g)?.length || 0;

      if (valueWc > upperBound) {
        return;
      }

      onChange(value);
    }
  };

  return (
    <div>
      <div className={c.textareaContainer}>
        <textarea
          value={value}
          onChange={handleInputChange}
          className={c.textarea}
          rows={rows}
          placeholder={label}
          disabled={disabled}
        />
      </div>
      <div className={c.textareaInfo}>
        <p className={c.wc}>
          {wc}/{limit}
        </p>
        {textTooShort && (
          <p className={c.error}>
            Text too short (target length: {limit} words, +/-{deviation})
          </p>
        )}
        {textTooLong && (
          <p className={c.error}>
            Text maximum (target length: {limit} words, +/-{deviation})
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
