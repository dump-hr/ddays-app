import { useState, useRef } from 'react';
import './InvitationCodeInput.scss';

const CODE_LENGTH = 6;

export const InvitationCodeInput = () => {
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
    <div className='invitation-code'>
      <h3>Imaš kod?</h3>

      <div className='code-inputs'>
        {code.map((char, index) => (
          <div key={index} className='code-input-wrapper'>
            <input
              ref={(el) => (inputsRef.current[index] = el)}
              type='text'
              maxLength={1}
              className='code-box'
              value={char}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />

            {index === 2 && <span className='minus'> - </span>}
          </div>
        ))}
      </div>
    </div>
  );
};
