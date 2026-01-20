import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';
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
    const char = value.slice(-1);

    if (!/^[a-zA-Z0-9]?$/.test(char)) return;

    const newCode = [...code];
    newCode[index] = char.toUpperCase();

    setCode(newCode);

    if (char && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    onChange({
      target: { name: 'inviteCode', value: newCode.join('') },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    const cleanData = pastedData.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (!cleanData) return;

    const newCode = [...code];

    for (let i = 0; i < cleanData.length; i++) {
      const targetIndex = index + i;
      if (targetIndex < CODE_LENGTH) {
        newCode[targetIndex] = cleanData[i];
      }
    }

    setCode(newCode);

    onChange({
      target: { name: 'inviteCode', value: newCode.join('') },
    } as ChangeEvent<HTMLInputElement>);

    const nextFocusIndex = Math.min(index + cleanData.length, CODE_LENGTH - 1);
    inputsRef.current[nextFocusIndex]?.focus();
  };

  return (
    <div className={c.invitationCode}>
      <h3>Imaš kod?</h3>

      <div className={c.codeInputs}>
        {code.map((char, index) => (
          <div key={index} className={c.codeInputWrapper}>
            <input
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type='text'
              inputMode='text'
              autoComplete='off'
              className={c.codeBox}
              value={char}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
            />

            {index === 2 && <span className={c.minus}>-</span>}
          </div>
        ))}
      </div>
      {error && <label className={c.errorText}>{error}</label>}
    </div>
  );
};
