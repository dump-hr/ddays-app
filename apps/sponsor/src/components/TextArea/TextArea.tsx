import c from './TextArea.module.scss';

type TextAreaProps = {
  limit: number;
  deviation?: number;
  value: string;
  label: string;
  disabled?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
};

export const TextArea = ({
  limit,
  deviation,
  value,
  label,
  disabled = false,
  rows = 6,
  onChange = () => {},
}: TextAreaProps) => {
  const lowerBound = !deviation ? 0 : limit - deviation;
  const upperBound = !deviation ? limit : limit + deviation;

  const wc = value.match(/\S+/g)?.length || 0;
  const textTooShort = wc > 0 && wc < lowerBound;
  const textTooLong = wc > 0 && wc >= upperBound;

  return (
    <div>
      <div className={c.textareaContainer}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
            Text too short (target length: {limit} words
            {!!deviation && ` +/-${deviation}`})
          </p>
        )}
        {textTooLong && (
          <p className={c.error}>
            Text maximum (target length: {limit} words
            {!!deviation && ` +/-${deviation}`})
          </p>
        )}
      </div>
    </div>
  );
};
