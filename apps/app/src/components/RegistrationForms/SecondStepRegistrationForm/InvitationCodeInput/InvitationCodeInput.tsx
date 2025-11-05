import { useState, useRef, ChangeEvent } from 'react';
import c from './invitationCodeInput.module.scss';

const CODE_LENGTH = 6;

export const InvitationCodeInput = ({
  onChange,
  error,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.toUpperCase();

    setCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    onChange({
      target: { name: 'inviteCode', value: newCode.join('') },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={c.invitationCode}>
      <h3>Imaš kod?</h3>

      <div className={c.codeInputs}>
        {code.map((char, index) => (
          <div key={index} className={c.codeInputWrapper}>
            <input
              ref={(el) => (inputsRef.current[index] = el)}
              type='text'
              maxLength={1}
              className={c.codeBox}
              value={char}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />

            {index === 2 && <span className={c.minus}> - </span>}
          </div>
        ))}
      </div>
      {error && (
        <label htmlFor='' className={c.errorText}>
          {error}
        </label>
      )}
    </div>
  );
};
